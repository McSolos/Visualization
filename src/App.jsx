import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

import CollapsibleNav from "./components/CollapsibleNav";
import Chart from "./components/charts";
import Status from "./components/Status";
import Guage from "./components/GuageChart";

function App() {
  const [selectedONT, setSelectedONT] = useState(null); // State for selected ONT details

  const data = {
    network: {
      description: "ipNX Nigeria",
      centralOffices: [
        {
          description: "HQ",
          location: "4 Balarabe Musa Crescent, Victoria Island, Lagos",
          OLTs: [
            {
              description: "HQ-OLT-1",
              status: "operational",
              slots: [
                {
                  ID: 1,
                  status: "operational",
                  PONPorts: [
                    {
                      ID: 1,
                      status: "UP",
                      ONTs: [
                        {
                          ID: 1,
                          status: "UP",
                          serial: "RCMG1234BEEF",
                          deviceType: "Raisecom",
                          OntRxPower: "-26.71 dBm",
                          lastChange: "2025-01-20 00:25:12",
                        },
                        {
                          ID: 2,
                          status: "UP",
                          serial: "RCMG5678FACE",
                          deviceType: "Raisecom",
                          OntRxPower: "-27.45 dBm",
                          lastChange: "2025-01-20 01:15:30",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  };
  
  
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Replace with your actual API URL
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://10.50.0.9/cgi-bin/readNetworkData.pl');
  //       const result = await response.json();
  //       const data = result; // Storing the fetched data in a constant
  //       setData(data); // Updating the state with the fetched data
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures this runs only once when the component mounts

  // if (!data) {
  //   return <div>Loading...</div>; // Show a loading message while data is being fetched
  // }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-auto h-screen bg-white shadow-md fixed top-0 left-0 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h2>
        <CollapsibleNav data={data} onSelectONT={setSelectedONT} />
      </div>

      {/* Main Content */}
      <div className="ml-80 flex-1 p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* ONT Details Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ONT: {selectedONT? selectedONT.ID: null} Details
            </h2>
            {selectedONT ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {/* ONT: {selectedONT.ID} Details */}
                </h2>
                <p><strong>ONT ID:</strong> {selectedONT.ID}</p>
                <p><strong>Status:</strong> {selectedONT.status}</p>
                <p><strong>Serial:</strong> {selectedONT.serial}</p>
                <p><strong>Device Type:</strong> {selectedONT.deviceType}</p>
                <p><strong>ONT Rx Power:</strong> {selectedONT.OntRxPower}</p>
                <p><strong>Last Change:</strong> {selectedONT.lastChange}</p>
              </div>
            ) : (
              <p>No ONT selected. Click on an ONT in the navigation to view details.</p>
            )}
          </div>

          {/* Chart Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Charts</h2>
            <Chart data={data} />
          </div>

          {/* Status Section */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Status</h2>
            <Status data={data} />
          </div> */}

          {/* Gauge Section */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gauge</h2>
            <Guage data={data} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
