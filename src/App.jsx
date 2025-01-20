import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import ONTDetails from "./components/ontDetails";
import CollapsibleNav from "./components/CollapsibleNav";
import Status from "./components/Status";
import Guage from "./components/GuageChart";
import Chart from "./components/charts";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with your actual API URL
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.50.0.9/cgi-bin/readNetworkData.pl');
        const result = await response.json();
        const data = result; 
        setData(data); // Updating the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  if (!data) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }
  const [selectedONT, setSelectedONT] = useState(null);

  const handleONTClick = (Details) => {
    setSelectedONT(Details);
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h2>
        <CollapsibleNav data={data} onONTClick={handleONTClick} />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Hierarchical Tree Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ONT Details
            </h2>
            {/* Placeholder for TreeView */}
            {selectedONT ? (
              <ONTDetails ont={selectedONT} />
            ) : (
              <p>No ONT selected. Click on an ONT to view details.</p>
            )}
          </div>

          {/* Chart Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Charts</h2>
            <Chart data={data} />
          </div>

          {/* Status Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Status</h2>
            <Status data={data} />
          </div>

          {/* Gauge Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gauge</h2>
            <Guage data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
