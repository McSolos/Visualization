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
import Guage from './components/GaugeOverview';



function App() {


  // const generateData = () => {
  //   // Helper function to generate ONTs for each PON port
  //   const generateONTs = (ponPortNumber) => {
  //     const ontCount = Math.floor(Math.random() * 3) + 1; // Random number of ONTs (1-64)
  //     return Array.from({ length: ontCount }, (_, index) => ({
  //       name: `ONT ${ponPortNumber}-${index + 1}`,
  //       status: Math.random() < 0.5 ? 'up' : 'down', // Random status
  //     }));
  //   };
  
  //   // Helper function to determine parent status based on children
  //   const determineParentStatus = (children) => {
  //     const hasDown = children.some((child) => child.status === 'down');
  //     return hasDown ? 'caution' : 'up';
  //   };
  
  //   // Helper function to generate PON ports for each slot
  //   const generatePONPorts = (slotNumber) => {
  //     const ponPortCount = Math.floor(Math.random() * 2) + 1; // Random number of PON ports (1-16)
  //     return Array.from({ length: ponPortCount }, (_, index) => {
  //       const children = generateONTs(slotNumber);
  //       return {
  //         name: `PON Port ${slotNumber}-${index + 1}`,
  //         children,
  //         status: determineParentStatus(children),
  //       };
  //     });
  //   };
  
  //   // Helper function to generate slots for each OLT
  //   const generateSlots = () => {
  //     const slotCount = Math.floor(Math.random() * 3) + 1; // Random number of slots (1-32)
  //     return Array.from({ length: slotCount }, (_, index) => {
  //       const children = generatePONPorts(index + 1);
  //       return {
  //         name: `Slot ${index + 1}`,
  //         children,
  //         status: "up", // Force status to "up" for all slots
  //       };
  //     });
  //   };
  
  //   // Helper function to generate OLTs for each CO
  //   const generateOLTs = () => {
  //     const oltCount = Math.floor(Math.random() * 3) + 1; // Random number of OLTs (1-5)
  //     return Array.from({ length: oltCount }, (_, index) => {
  //       const children = generateSlots();
  //       return {
  //         name: `OLT ${index + 1}`,
  //         children,
  //         status: "up", // Force status to "up" for all OLTs
  //       };
  //     });
  //   };
  
  //   // Helper function to generate COs for each region
  //   const generateCOs = () => {
  //     const coCount = Math.floor(Math.random() * 1) + 2; // Random number of COs (1-3)
  //     return Array.from({ length: coCount }, (_, index) => ({
  //       name: `CO ${index + 1}`,
  //       children: generateOLTs(),
  //     }));
  //   };
  
  //   return {
  //     name: "Network",
  //     children: generateCOs(),
  //   };
  // };
  
  // const data = generateData(); 
  // console.log(JSON.stringify(data,));

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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* Hierarchical Tree Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hierarchical Tree Diagram
        </h2>
        <div className="flex p-4 border border-gray-200 rounded-md">
          {/* <TreeView data={data} /> */}
          <div className=" bg-gray-50 flex items-center ">
            <CollapsibleNav data={data} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="justify-around bg-white shadow-lg rounded-lg p-6">
        <Chart data={data} />
      </div>
      {/* Status Section */}
      <div className="flex flex-row justify-center items-center bg-white shadow-lg rounded-lg p-6">
        {/* <Status data={data}/> */}
      </div>
      
      <div className="justify-around">
      </div>

      {/* guage Section */}
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-black">
        {/* <Guage data={data} /> */}
      </div>

    </div>
    // </div>
)};



export default App
