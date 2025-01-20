import React, { useState } from 'react';

import Caution from '../assets/causion.png';
import Good from '../assets/check.png';
import Error from '../assets/error-icon-4.png';

function Status({ data }) {
  const [selectedCO, setSelectedCO] = useState(data.network.centralOffices[0]?.description);
  const [selectedOLT, setSelectedOLT] = useState(data.network.centralOffices[0]?.OLTs[0]?.description);

  // Utility function to determine if a status is "up"
  const isUp = (status) =>
    status?.toLowerCase() === 'up' || status?.toLowerCase() === 'operational';

  // Filter Central Offices and OLTs
  const centralOffices = data.network.centralOffices;
  const selectedCOData = centralOffices.find((co) => co.description === selectedCO);
  const olts = selectedCOData?.OLTs || [];
  const selectedOLTData = olts.find((olt) => olt.description === selectedOLT);

  // Evaluate the status of the selected OLT
  const oltStatus = selectedOLTData
    ? {
        description: selectedOLTData.description,
        path: `${selectedOLTData.description}`,
        isOLTDown: !isUp(selectedOLTData.status),
        downNodes: selectedOLTData.slots.flatMap((slot) =>
          slot.PONPorts.flatMap((ponPort) =>
            ponPort.ONTs.filter((ont) => !isUp(ont.status)).map(
              (ont) => `${ont.deviceType} (ID: ${ont.ID}) failed (${selectedOLTData.description} > ${slot.ID} > ${ponPort.ID}   ______LastChange: ${ont.lastChange})`
            )
          )
        ),
      }
    : null;

  return (
    <div className="justify-around bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-center font-serif font-bold">Status</h2>

      {/* Central Office Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Central Office:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCO}
          onChange={(e) => {
            const newCO = e.target.value;
            setSelectedCO(newCO);
            setSelectedOLT(centralOffices.find((co) => co.description === newCO)?.OLTs[0]?.description || '');
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
      {oltStatus && (
        <div className="flex flex-col items-center">
          {/* Dynamic Image and Message */}
          {oltStatus.isOLTDown ? (
            <>
              <div className="flex justify-center h-40">
                <img className="h-32 w-32 object-contain" src={Error} alt="Error" />
              </div>
              <p className="text-center font-serif text-red-500">OLT DOWN</p>
            </>
          ) : oltStatus.downNodes.length > 0 ? (
            <>
              <div className="flex justify-center h-40">
                <img className="h-32 w-32 object-contain" src={Caution} alt="Caution" />
              </div>
              <p className="text-center font-serif text-yellow-500">There is a failure somewhere</p>
              <ul className="list-disc text-left pl-10">
                {oltStatus.downNodes.map((node, idx) => (
                  <li key={idx} className="text-sm">
                    {node}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex justify-center h-40">
                <img className="h-32 w-32 object-contain" src={Good} alt="Good" />
              </div>
              <p className="text-center font-serif text-green-500">Everything is good here</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Status;
