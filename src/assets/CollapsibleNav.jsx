import React, { useState, useEffect } from "react";

const CollapsibleNav = ({ data, onSelectONT }) => {
  const [openItems, setOpenItems] = useState({});

  // Function to open all items by default down to the ONT level
  useEffect(() => {
    const openAllItems = {};

    // Recursive function to set all items as open
    const expandItems = (node, parentId = "") => {
      const id = parentId
        ? `${parentId}-${node.description || `${node.ID}`}`
        : node.description || `${node.ID}`;

      openAllItems[id] = true; // Mark the current node as open

      // Expand children (handling OLTs, slots, PONPorts, and ONTs)
      const children = node.OLTs || node.slots || node.PONPorts || node.ONTs;

      if (children) {
        children.forEach((child) => expandItems(child, id)); // Expand all child nodes
      }
    };

    data.network.centralOffices.forEach((co) => expandItems(co)); // Expand from central offices
    setOpenItems(openAllItems); // Update state with all nodes marked as open
  }, [data]);

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

    if (normalizedStatus === "down") {
      return "bg-red-500 text-black"; // Warning status
    }

    if (normalizedStatus === "error") {
      return "bg-yellow-500 text-black"; // Error status
    }

    if (!normalizedStatus || ["down"].includes(normalizedStatus)) {
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
      <div key={id} className="pl-2">
        {/* Parent Item */}
        <div
          className={`flex items-center justify-between cursor-pointer py-1 px-4 rounded-md hover:bg-opacity-80 
            ${getStatusColor(node.status)}`}
          onClick={() => {
            if (!children && onSelectONT) {
              onSelectONT(node); // Pass ONT details to parent component
            }
            toggleItem(id);
          }}
          style={{
            display: "flex",
            flexShrink: 0,
          }}
        >
          <span className="text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
            {node.description || `${prefix} ${node.ID}`}
          </span>
          {node.serial && (
            <span className="ml-2 text-m font-light text-black-600">
              {node.serial}
            </span>
          )}

          {/* Hover bubble for details */}
          <div className="relative group">
            <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg w-48">
              {node.location && <p>Location: {node.location}</p>}
              {node.status && <p>Status: {node.status}</p>}
            </div>
          </div>

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
          <div className="pl-6">
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
        renderTree({
          description: co.description,
          status: co.status,
          location: co.location,
          OLTs: co.OLTs,
        })
      )}
    </div>
  );
};

export default CollapsibleNav;
