import React from 'react';
import Tree from 'react-d3-tree';

const TreeView = ({ data }) => {
  const containerStyles = {
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={containerStyles}>
      <Tree 
        data={data} 
        orientation="vertical" 
        translate={{ x: 300, y: 50 }} 
        pathFunc="straight" // Optional: adjust the line style between nodes
        collapsible={true}
      />
    </div>
  );
};

export default TreeView;
