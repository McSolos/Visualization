import React from "react";
import Tree from "react-d3-tree";

const TreeView = ({ data }) => {
  const containerStyles = {
    width: "100%",
    height: "60vh", // Adjust height for a balanced layout
  };

  return (
    <div style={containerStyles}>
      <Tree
        data={data}
        orientation="vertical"
        translate={{ x: 300, y: 50 }}
        pathFunc="straight"
        collapsible={true}
      />
    </div>
  );
};

export default TreeView;
