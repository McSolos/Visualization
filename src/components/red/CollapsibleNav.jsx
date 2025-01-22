import React, { useState, useEffect } from "react";

const CollapsibleNav = ({ data, onSelectONT }) => {
  const [openItems, setOpenItems] = useState({});

  // Precompute openItems to expand all nodes by default
  useEffect(() => {
    const initializeOpenItems = (node, parentId = "") => {
      const id = parentId
        ? `${parentId}-${node.description || node.ID}`
        : node.description || node.ID;
      const children = node.OLTs || node.slots || node.PONPorts || node.ONTs;

      const newState = { [id]: true }; // Mark this node as open
      if (children) {
        children.forEach((child) => {
          Object.assign(newState, initializeOpenItems(child, id));
        });
      }
      return newState;
    };

    if (data && data.network && data.network.centralOffices) {
      const initialState = {};
      data.network.centralOffices.forEach((co) => {
        Object.assign(initialState, initializeOpenItems(co));
      });
      setOpenItems(initialState);
    }
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
      return "bg-red-500 text-black"; // DOWN
    }
    if (normalizedStatus === "error") {
      return "bg-yellow-500 text-black"; // ERROR
    }
    return "bg-gray-100"; // Default
  };

  const renderTree = (node, parentId = "") => {
    const id = parentId
      ? `${parentId}-${node.description || node.ID}`
      : node.description || node.ID;
    const children = node.OLTs || node.slots || node.PONPorts || node.ONTs;

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
        >
          <span className="text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
            {node.description || node.ID}
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
          <div className="pl-6">
            {children.map((child) => renderTree(child, id))}
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
