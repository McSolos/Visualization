import React, { useState } from "react";

import Caution from "../assets/causion.png";
import Good from "../assets/check.png";
import Error from "../assets/error-icon-4.png";

function Status({ data }) {
  const [selectedCO, setSelectedCO] = useState(
    data.network.centralOffices[0]?.description
  );
  const [selectedOLT, setSelectedOLT] = useState(
    data.network.centralOffices[0]?.OLTs[0]?.description
  );
  const [showAllONTs, setShowAllONTs] = useState(false); // State to toggle ONT list expansion

  // Utility function to determine if a status is "up"
  const isUp = (status) =>
    status?.toLowerCase() === "up" || status?.toLowerCase() === "operational";

  // Filter Central Offices and OLTs
  const centralOffices = data.network.centralOffices;
  const selectedCOData = centralOffices.find(
    (co) => co.description === selectedCO
  );
  const olts = selectedCOData?.OLTs || [];
  const selectedOLTData = olts.find((olt) => olt.description === selectedOLT);

  // Gather failed ONTs if the OLT has a "Caution" status
  let failedONTs = [];
  if (selectedOLTData?.slots) {
    failedONTs = selectedOLTData.slots.flatMap((slot) =>
      slot.PONPorts.flatMap((ponPort) =>
        ponPort.ONTs.filter((ont) => !isUp(ont.status)).map((ont) => ({
          description: ont.deviceType,
          id: ont.ID,
          lastChange: ont.lastChange,
          path: `${selectedOLTData.description} > Slot ${slot.ID} > PON Port ${ponPort.ID}`,
        }))
      )
    );
  }

  // Determine the overall status of the selected OLT
  let statusMessage = "Good";
  let statusIcon = Good;
  let statusTextColor = "text-green-500";

  if (selectedOLTData) {
    if (selectedOLTData.status?.toLowerCase() === "down") {
      statusMessage = "OLT DOWN";
      statusIcon = Error;
      statusTextColor = "text-red-500";
    } else if (selectedOLTData.status?.toLowerCase() === "error" || failedONTs.length > 0) {
      statusMessage = "Caution";
      statusIcon = Caution;
      statusTextColor = "text-yellow-500";
    }
  }

  return (
    <div className="justify-around bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-center font-serif font-bold">Status</h2>

      {/* Central Office Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Select Central Office:
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCO}
          onChange={(e) => {
            const newCO = e.target.value;
            setSelectedCO(newCO);
            setSelectedOLT(
              centralOffices.find((co) => co.description === newCO)?.OLTs[0]
                ?.description || ""
            );
          }}
        >
          {centralOffices.map((co) => (
            <option key={co.description} value={co.description}>
              {co.description}
            </option>
          ))}
        </select>
      </div>

      {/* OLT Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select OLT:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedOLT}
          onChange={(e) => setSelectedOLT(e.target.value)}
        >
          {olts.map((olt) => (
            <option key={olt.description} value={olt.description}>
              {olt.description}
            </option>
          ))}
        </select>
      </div>

      {/* Status Display */}
      {selectedOLTData && (
        <div className="flex flex-col items-center">
          {/* Dynamic Image and Message */}
          <div className="flex justify-center h-40">
            <img
              className="h-32 w-32 object-contain"
              src={statusIcon}
              alt={statusMessage}
            />
          </div>
          <p className={`text-center font-serif ${statusTextColor}`}>
            {statusMessage}
          </p>

          {/* Display failed ONTs if caution */}
          {statusMessage === "Caution" && failedONTs.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-center mb-2 text-yellow-500">
                The following ONTs are not operational:
              </p>
              <ul className="list-disc text-left pl-10">
                {(showAllONTs ? failedONTs : failedONTs.slice(0, 3)).map(
                  (ont, idx) => (
                    <li key={idx} className="text-sm">
                      {ont.description} (ONT ID: {ont.id}) failed at <br />
                      Path: {ont.path}
                      <br />
                      Last Change: {ont.lastChange}
                    </li>
                  )
                )}
              </ul>
              {/* Toggle View More / View Less */}
              {failedONTs.length > 3 && (
                <button
                  className="mt-2 text-blue-500 hover:underline text-sm"
                  onClick={() => setShowAllONTs((prev) => !prev)}
                >
                  {showAllONTs ? "View Less" : "View More"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Status;
