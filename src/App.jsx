import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';

import MapView from './components/TreeView' 
import Tree from 'react-d3-tree';
import TreeView from './components/TreeView'
import Chart from './components/charts'

function App() {


  const generateData = () => {
    // Helper function to generate ONTs for each PON port
    const generateONTs = (ponPortNumber) => {
      const ontCount = Math.floor(Math.random() * 3) + 1; // Random number of ONTs (1-64)
      return Array.from({ length: ontCount }, (_, index) => ({
        name: `ONT ${ponPortNumber}-${index + 1}`,
      }));
    };
  
    // Helper function to generate PON ports for each slot
    const generatePONPorts = (slotNumber) => {
      const ponPortCount = Math.floor(Math.random() * 2) + 1; // Random number of PON ports (1-16)
      return Array.from({ length: ponPortCount }, (_, index) => ({
        name: `PON Port ${slotNumber}-${index + 1}`,
        children: generateONTs(slotNumber),
      }));
    };
  
    // Helper function to generate slots for each OLT
    const generateSlots = () => {
      const slotCount = Math.floor(Math.random() * 3 ) + 1; // Random number of slots (1-32)
      return Array.from({ length: slotCount }, (_, index) => ({
        name: `Slot ${index + 1}`,
        children: generatePONPorts(index + 1),
      }));
    };
  
    // Helper function to generate OLTs for each CO
    const generateOLTs = () => {
      const oltCount = Math.floor(Math.random() * 3) + 1; // Random number of OLTs (1-5)
      return Array.from({ length: oltCount }, (_, index) => ({
        name: `OLT ${index + 1}`,
        children: generateSlots(),
      }));
    };
  
    // Helper function to generate COs for each region
    const generateCOs = () => {
      const coCount = Math.floor(Math.random() * 2) + 1; // Random number of COs (1-3)
      return Array.from({ length: coCount }, (_, index) => ({
        name: `CO ${index + 1}`,
        children: generateOLTs(),
      }));
    };
  
    // Helper function to generate regions
    const generateRegions = () => {
      const regionCount = Math.floor(Math.random() * 1) + 1; // Random number of regions (1-2)
      return Array.from({ length: regionCount }, (_, index) => ({
        name: `Region ${index + 1}`,
        children: generateCOs(),
      }));
    };
  
    return {
      name: 'Network',
      children: generateRegions(),
    };
  };
  

  const data = generateData(); 
  


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* Hierarchical Tree Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hierarchical Tree Diagram
        </h2>
        <div className="p-4 border border-gray-200 rounded-md">
          <TreeView data={data} />
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Chart />
      </div>
    </div>
)};



export default App
