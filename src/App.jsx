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
    "network": {
        "description": "ipNX Nigeria",
        "centralOffices": [
            {
                "description": "Ibadan CO",
                "status": "error",
                "location": "Cocoa House, Dugbe, Ibadan",
                
                "OLTs": [
                    {
                        "status": "ERROR",
                        "slots": [
                            {
                                "ID": "1",
                                "PONPorts": [
                                    {
                                        "ONTs": [
                                            {
                                                "lastChange": "2024-08-28 18:28:05.877129",
                                                "ID": "1",
                                                "serial": "RCMG18C0051F",
                                                "status": "dyingGaspReceived"
                                            },
                                            {
                                                "serial": "RCMG3B4803E0",
                                                "ID": "2",
                                                "lastChange": "2025-01-20 13:53:07.227188",
                                                "status": "UP"
                                            },
                                            {
                                                "status": "dyingGaspReceived",
                                                "serial": "GPON186A1749",
                                                "ID": "3",
                                                "lastChange": "2024-11-01 22:08:11.374235"
                                            },
                                            {
                                                "serial": "RCMG3AB012E2",
                                                "ID": "4",
                                                "lastChange": "2023-11-14 13:27:50.382713",
                                                "status": "dyingGaspReceived"
                                            },
                                            {
                                                "lastChange": "2024-11-12 11:30:30.441421",
                                                "ID": "5",
                                                "serial": "GPON186A174E",
                                                "status": "dyingGaspReceived"
                                            },
                                            {
                                                "ID": "6",
                                                "serial": "GPON186A1F81",
                                                "lastChange": "2025-01-21 06:55:44.663812",
                                                "status": "UP"
                                            },
                                            {
                                                "ID": "7",
                                                "serial": "RCMG3B209813",
                                                "lastChange": "2025-01-21 06:59:49.668287",
                                                "status": "UP"
                                            }
                                        ],
                                        "ID": "1",
                                        "status": "UP"
                                    },
                                    {
                                        "ID": "2",
                                        "ONTs": [
                                            {
                                                "status": "UP",
                                                "lastChange": "2025-01-21 06:49:43.661451",
                                                "ID": "1",
                                                "serial": "RCMG3B4804A1"
                                            },
                                            {
                                                "serial": "RCMG18C006EE",
                                                "ID": "11",
                                                "lastChange": "2024-08-24 09:04:30.628921",
                                                "status": "dyingGaspReceived"
                                            },
                                            {
                                                "ID": "2",
                                                "serial": "RCMG18C004AE",
                                                "lastChange": "2025-01-21 07:08:59.672297",
                                                "status": "UP"
                                            },
                                            {
                                                "status": "branchFiberCut",
                                                "ID": "5",
                                                "serial": "RCMG1A400412",
                                                "lastChange": "2024-08-23 13:09:57.379892"
                                            },
                                            {
                                                "status": "branchFiberCut",
                                                "lastChange": "2024-08-23 12:44:03.178341",
                                                "serial": "GPON186A168E",
                                                "ID": "7"
                                            },
                                            {
                                                "status": "dyingGaspReceived",
                                                "lastChange": "2024-08-07 15:52:04.350474",
                                                "ID": "9",
                                                "serial": "RCMG19B859A3"
                                            }
                                        ],
                                        "status": "operational"
                                    }
                                ],
                                "status": "up"
                            }
                        ],
                        "ID": "10.61.102.251",
                        "description": "IBADAN_OLT",
                        "status": "operational"
                    }
                ]
            }
        ]
    }
}
  
  
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
    <div className="flex min-h-screen bg-gray-5">
      {/* Sidebar */}
      <div className="flex-col w-auto h-screen bg-white shadow-md fixed top-0 left-0 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h2>
        <CollapsibleNav data={data} onSelectONT={setSelectedONT} />
      </div>

      <div className="flex-col">

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
                <p><strong>Last Change:</strong> {selectedONT.lastChange}</p>
                <p><strong>Device Type:</strong> {selectedONT.deviceType}</p>
                <p><strong>ONT Rx Power:</strong> {selectedONT.OntRxPower}</p>
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
    </div>
  );
}

export default App;
