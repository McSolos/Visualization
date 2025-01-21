import React, { useState, useEffect } from "react";

const CollapsibleNav = ({ data, onSelectONT }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "up" || normalizedStatus === "operational") {
      return "bg-green-500 text-white"; // UP or OPERATIONAL
    }

    if (normalizedStatus === "dyinggaspreceived") {
      return "bg-gray-500 text-black"; // Warning status
    }

    if (!normalizedStatus || ["error", ""].includes(normalizedStatus)) {
      return "bg-gray-100"; // Default for error or unknown statuses
    }

    return "bg-red-500 text-white"; // OTHERS
  };

  const renderTree = (node, parentId = "", prefix = "") => {
    const id = parentId
      ? `${parentId}-${node.description || `${prefix} ${node.ID}`}`
      : node.description || `${prefix} ${node.ID}`;
    const children = node.OLTs || node.slots || node.PONPorts || node.ONTs;

    // Determine prefix based on the node type
    const newPrefix = node.OLTs
      ? "OLT"
      : node.slots
      ? "Slot"
      : node.PONPorts
      ? "PON Port"
      : node.ONTs
      ? "ONT"
      : "";

    return (
      <div key={id} className="pl-4">
        {/* Parent or ONT Item */}
        <div
          className={`flex items-center justify-between cursor-pointer py-2 px-4 rounded-md hover:bg-opacity-80  
            ${getStatusColor(node.status)}`}
          onClick={() => {
            if (!children && onSelectONT) {
              onSelectONT(node); // Pass ONT details to parent component
            }
            toggleItem(id);
          }}
        >
          <span className="text-sm font-medium ">
            {node.description || `${prefix} ${node.ID}`}
          </span>
          {children && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform ${
                openItems[id] ? "rotate-90" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Child Items */}
        {children && openItems[id] && (
          <div className="pl-6 ">
            {children.map((child) =>
              renderTree(child, id, newPrefix) // Pass new prefix to children
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {data.network.centralOffices.map((co) =>
        renderTree({ description: co.description, status: null, OLTs: co.OLTs })
      )}
    </div>
  );
};

export default CollapsibleNav;
