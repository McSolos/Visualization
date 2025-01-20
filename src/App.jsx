import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';

import MapView from './components/TreeView' 
import Tree from 'react-d3-tree';
import TreeView from './components/TreeView'
import Chart from './components/charts'

import Caution from './assets/causion.png'
import Good from './assets/check.png'
import Error from './assets/error-icon-4.png'

import CollapsibleNav from './components/CollapsibleNav';
import Status from './components/Status';
// import { generateData } from './GenerateData';
// import Guage from './components/GaugeOverview';
import Guage from './components/GuageChart'




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
                          "ID": 2,
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
              "description": "Ikeja-OLT-1",
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
                          "status": "dyinggaspreceived",
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
                          "status": "down",
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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* Hierarchical Tree Section */}
      {/* Fixed Sidebar */}
      <div className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Hierarchical Tree Diagram
        </h2>
        <CollapsibleNav data={data} />
      </div>

      <div className="justify-around bg-white shadow-lg rounded-lg p-6">
        {/* <Chart data={data} /> */}
      </div>

      {/* Charts Section */}
      <div className="justify-around bg-white shadow-lg rounded-lg p-6">
        <Chart data={data} />
      </div>
      {/* Status Section */}
      <div className="flex flex-row justify-center items-center bg-white shadow-lg rounded-lg p-6">
        <Status data={data}/>
      </div>
      
      <div className="justify-around">
      </div>

      {/* guage Section */}
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-black">
        <Guage data={data} />
      </div>
    </div>
  );
}

export default App;
