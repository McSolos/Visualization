import React, { useState } from 'react';
import GaugeChart from 'react-gauge-chart';

function GuageChart({ data }) {
  const [selectedCO, setSelectedCO] = useState('ALL');

  // Utility to calculate percentages with custom status mapping
  const calculatePercentage = (items, statusKey = 'status', operationalStatus = 'operational') => {
    const total = items.length;
    const upCount = items.filter(
      (item) => item[statusKey]?.toLowerCase() === 'up' || item[statusKey]?.toLowerCase() === operationalStatus.toLowerCase()
    ).length;
    return total > 0 ? upCount / total : 0; // Return percentage as a decimal
  };

  // Filter data by the selected Central Office
  const filteredData = selectedCO === 'ALL'
    ? data.network.centralOffices
    : data.network.centralOffices.filter((co) => co.description === selectedCO);

  // Extract percentages for each device type
  const oltPercentage = calculatePercentage(
    filteredData.flatMap((co) => co.OLTs),
    'status',
    'operational'
  );

  const slotPercentage = calculatePercentage(
    filteredData.flatMap((co) =>
      co.OLTs.flatMap((olt) => olt.slots)
    ),
    'status',
    'operational'
  );

  const ponPortPercentage = calculatePercentage(
    filteredData.flatMap((co) =>
      co.OLTs.flatMap((olt) =>
        olt.slots.flatMap((slot) => slot.PONPorts)
      )
    ),
    'status',
    'up'
  );

  const ontPercentage = calculatePercentage(
    filteredData.flatMap((co) =>
      co.OLTs.flatMap((olt) =>
        olt.slots.flatMap((slot) =>
          slot.PONPorts.flatMap((ponPort) => ponPort.ONTs)
        )
      )
    ),
    'status',
    'up'
  );

  // Get Central Office options for the dropdown
  const centralOfficeOptions = ['ALL', ...data.network.centralOffices.map((co) => co.description)];

  return (
    <div>
      {/* Dropdown for Central Office Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Central Office:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCO}
          onChange={(e) => setSelectedCO(e.target.value)}
        >
          {centralOfficeOptions.map((co) => (
            <option key={co} value={co}>
              {co}
            </option>
          ))}
        </select>
      </div>

      {/* Gauge Charts */}
      <div className="flex justify-between items-center w-50">
        {/* OLT Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-olt"
            nrOfLevels={25}
            colors={['#00FF00', '#FF0000']}
            arcWidth={0.3}
            percent={oltPercentage}
            textColor=""
          />
          <h3>OLTs</h3>
          <p>Percentage: {(oltPercentage * 100).toFixed(1)}%</p>
        </div>

        {/* Slot Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-slot"
            nrOfLevels={25}
            colors={['#00FF00', '#FF0000']}
            arcWidth={0.3}
            percent={slotPercentage}
            textColor=""
          />
          <h3>Slots</h3>
          <p>Percentage: {(slotPercentage * 100).toFixed(1)}%</p>
        </div>

        {/* PON Port Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-ponport"
            nrOfLevels={25}
            colors={['#00FF00', '#FF0000']}
            arcWidth={0.3}
            percent={ponPortPercentage}
            textColor=""
          />
          <h3>PON Ports</h3>
          <p>Percentage: {(ponPortPercentage * 100).toFixed(1)}%</p>
        </div>

        {/* ONT Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-ont"
            nrOfLevels={25}
            colors={['#00FF00', '#FF0000']}
            arcWidth={0.3}
            percent={ontPercentage}
            textColor=""
          />
          <h3>ONTs</h3>
          <p>Percentage: {(ontPercentage * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

export default GuageChart;
