import React, { useState, useEffect } from "react";
import Caution from "../assets/causion.png";
import Good from "../assets/check.png";
import Error from "../assets/error-icon-4.png";

const Status = ({ data }) => {
  const [selectedCO, setSelectedCO] = useState("");
  const [selectedOLT, setSelectedOLT] = useState("");

  // Helper to recursively determine status and collect errors
  const evaluateStatus = (node, path = []) => {
    const currentPath = [...path, node.name];
    if (!node.children) {
      return {
        status: node.status === "down" ? "ERROR" : "GOOD",
        errors: node.status === "down" ? [currentPath] : [],
      };
    }

    const childStatuses = node.children.map((child) =>
      evaluateStatus(child, currentPath)
    );

    const errors = childStatuses.flatMap((child) => child.errors);
    const hasError = errors.length > 0;

    const status = node.status === "down"
      ? "ERROR"
      : hasError
      ? "CAUTION"
      : "GOOD";

    return { status, errors };
  };

  // Get options for COs and OLTs
  const coOptions = data.children.map((co) => co.name);

  useEffect(() => {
    if (coOptions.length > 0) setSelectedCO(coOptions[0]); // Default to the first CO
  }, [coOptions]);

  const oltOptions =
    selectedCO &&
    data.children.find((co) => co.name === selectedCO)?.children?.map((olt) => olt.name) || [];

  useEffect(() => {
    if (oltOptions.length > 0) setSelectedOLT(oltOptions[0]); // Default to the first OLT
  }, [oltOptions]);

  // Determine the status of the selected node or the entire network
  const determineStatus = () => {
    let targetNode;
    if (selectedCO === "" || selectedCO === "All COs") {
      const errors = data.children.flatMap((co) => evaluateStatus(co).errors);
      const status = errors.length > 0 ? "CAUTION" : "GOOD";
      return { status, errors };
    }

    if (selectedOLT) {
      targetNode = data.children
        .find((co) => co.name === selectedCO)
        ?.children.find((olt) => olt.name === selectedOLT);
    } else {
      targetNode = data.children.find((co) => co.name === selectedCO);
    }

    return targetNode ? evaluateStatus(targetNode) : { status: "GOOD", errors: [] };
  };

  const status = determineStatus();

  const getStatusImage = () => {
    if (status.status === "ERROR") return Error;
    if (status.status === "CAUTION") return Caution;
    return Good;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96">
      <h2 className="text-center font-serif font-bold">Status</h2>

      {/* Filters for CO and OLT */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select CO:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCO}
          onChange={(e) => {
            setSelectedCO(e.target.value);
            setSelectedOLT(""); // Reset OLT when CO changes
          }}
        >
          <option value="">-- Select CO --</option>
          <option value="All COs">-- All COs --</option>
          {coOptions.map((co) => (
            <option key={co} value={co}>
              {co}
            </option>
          ))}
        </select>
      </div>

      {selectedCO && selectedCO !== "All COs" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select OLT:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedOLT}
            onChange={(e) => setSelectedOLT(e.target.value)}
          >
            <option value="">-- Select OLT --</option>
            {oltOptions.map((olt) => (
              <option key={olt} value={olt}>
                {olt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Status Display */}
      {(selectedOLT || selectedCO === "All COs") && status && (
        <div>
          <div className="flex justify-center h-40">
            <img src={getStatusImage()} alt="Status Icon" />
          </div>
          <p className="text-center font-serif font-bold">
            {status.status === "GOOD"
              ? "You're all good"
              : status.status === "CAUTION"
              ? "Caution, there's a failure somewhere"
              : "Error: OLT Down"}
          </p>

          {status.errors.length > 0 && (
            <div className="mt-4">
              <h4 className="text-center font-serif font-bold">Issues:</h4>
              <ul className="list-disc list-inside">
                {status.errors.map((errorPath, idx) => (
                  <li key={idx}>{errorPath.join(" > ")}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Status;
