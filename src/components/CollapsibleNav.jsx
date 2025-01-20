import React, { useState, useEffect } from "react";

const CollapsibleNav = ({ data, onONTClick }) => {
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    const initializeOpenItems = (node, parentId = "", level = 0) => {
      const id = parentId ? `${parentId}-${node.description}` : node.description;
      let newOpenItems = {};
  
      // Expand nodes up to level 2 (OLT level)
      if (level < 3) {
        newOpenItems[id] = true;
      }
  
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child) => {
          newOpenItems = {
            ...newOpenItems,
            ...initializeOpenItems(child, id, level + 1),
          };
        });
      }
  
      return newOpenItems;
    };
  
    if (data) {
      setOpenItems((prevState) => ({
        ...prevState,
        ...initializeOpenItems(data),
      }));
    }
  }, [data]);
  
  
  // Initialize openItems state
  // useEffect(() => {
  //   setOpenItems(initializeOpenItems(data));
  // }, [data]);

  // Toggles the visibility of children
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

  // Recursive function to render the hierarchy
  const renderTree = (node, parentId = "") => {
    const id = parentId ? `${parentId}-${node.description || node.ID}` : node.description || node.ID;
    const children = node.OLTs || node.slots || node.PONPorts || node.ONTs;

    const isONT = Boolean(node.serial); // Check if the node is an ONT

    return (
      <div key={id} className="pl-4">
        {/* Parent or ONT Item */}
        <div
          className={`flex items-center justify-between cursor-pointer py-2 px-4 rounded-md hover:bg-opacity-80 ${getStatusColor(
            node.status
          )}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation
            if (isONT) {
              onONTClick(node); // Call onONTClick with ONT details
            } else {
              toggleItem(id); // Toggle for non-ONT items
            }
          }}
        >
          <span className="text-sm font-medium">{node.description || `ID: ${node.ID}`}</span>
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
