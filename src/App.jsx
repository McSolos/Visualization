import React from "react";
import CollapsibleNav from "./components/CollapsibleNav";
import Chart from "./components/charts";

function App() {
  const data = {
    "network": {
      "description": "ipNX Nigeria",
      "centralOffices": [
        {
          "description": "HQ",
          "location": "4 Balarabe Musa Crescent, Victoria Island, Lagos",
          "OLTs": [
            {
              "description": "HQ-OLT-1",
              "status": "operational",
              "slots": [
                {
                  "ID": 1,
                  "status": "operational",
                  "PONPorts": [
                    {
                      "ID": 1,
                      "status": "UP",
                      "ONTs": [
                        {
                          "ID": 1,
                          "status": "UP",
                          "serial": "RCMG1234BEEF",
                          "deviceType": "Raisecom",
                          "OntRxPower": "-26.71 dBm",
                          "lastChange": "2025-01-20 00:25:12"
                        },
                        {
                          "ID": 1,
                          "status": "UP",
                          "serial": "RCMG1234BEEF",
                          "deviceType": "Raisecom",
                          "OntRxPower": "-26.71 dBm",
                          "lastChange": "2025-01-20 00:25:12"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
	{
          "description": "Ikeja",
          "location": "Ikeja GRA, Lagos",
          "OLTs": [
            {
              "description": "HQ-OLT-1",
              "status": "operational",
              "slots": [
                {
                  "ID": 1,
                  "status": "operational",
                  "PONPorts": [
                    {
                      "ID": 1,
                      "status": "UP",
                      "ONTs": [
                        {
                          "ID": 1,
                          "status": "DOWN",
                          "serial": "RCMG1234BEEF",
                          "deviceType": "Raisecom",
                          "OntRxPower": "-26.71 dBm",
                          "lastChange": "2025-01-20 00:25:12"
                        }
                      ]
                    }
                  ]
                },
                {
                  "ID": 2,
                  "status": "operational",
                  "PONPorts": [
                    {
                      "ID": 1,
                      "status": "UP",
                      "ONTs": [
                        {
                          "ID": 1,
                          "status": "DOWN",
                          "serial": "RCMG1234BEEF",
                          "deviceType": "Raisecom",
                          "OntRxPower": "-26.71 dBm",
                          "lastChange": "2025-01-20 00:25:12"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
  
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Hierarchical Tree Diagram
        </h2>
        <CollapsibleNav data={data} />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        {/* Hierarchical Tree Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Hierarchical Tree Diagram
          </h2>
          <div className="p-4 border border-gray-200 rounded-md">
            {/* Placeholder for Tree Diagram */}
            <p>Tree Diagram Goes Here</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Charts</h2>
          <Chart data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
