import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";

function GaugeChartComponent({ data }) {
  const [selectedCO, setSelectedCO] = useState("ALL");

  // Utility to calculate active and dead counts
  const calculateActiveDeadCounts = (items, statusKey = "status", activeStatuses = ["up", "operational"]) => {
    const activeCount = items.filter((item) =>
      activeStatuses.includes(item[statusKey]?.toLowerCase())
    ).length;
    const deadCount = items.length - activeCount;
    return { active: activeCount, dead: deadCount, total: items.length };
  };

  // Filter data by the selected Central Office
  const filteredData =
    selectedCO === "ALL"
      ? data.network.centralOffices
      : data.network.centralOffices.filter((co) => co.description === selectedCO);

  // Compute active and dead counts for each category
  const oltCounts = calculateActiveDeadCounts(
    filteredData.flatMap((co) => co.OLTs),
    "status",
    ["up", "operational"]
  );

  const slotCounts = calculateActiveDeadCounts(
    filteredData.flatMap((co) =>
      co.OLTs.flatMap((olt) => olt.slots)
    ),
    "status",
    ["up", "operational"]
  );

  const ponPortCounts = calculateActiveDeadCounts(
    filteredData.flatMap((co) =>
      co.OLTs.flatMap((olt) =>
        olt.slots.flatMap((slot) => slot.PONPorts)
      )
    ),
    "status",
    ["up"]
  );

  const ontCounts = calculateActiveDeadCounts(
    filteredData.flatMap((co) =>
      co.OLTs.flatMap((olt) =>
        olt.slots.flatMap((slot) =>
          slot.PONPorts.flatMap((ponPort) => ponPort.ONTs)
        )
      )
    ),
    "status",
    ["up"]
  );

  // Get Central Office options for the dropdown
  const centralOfficeOptions = ["ALL", ...data.network.centralOffices.map((co) => co.description)];

  // Utility to compute percentage
  const computePercentage = ({ active, total }) => (total > 0 ? active / total : 0);

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

      <div className="flex flex-row items-center space-x-6">
        {/* OLT Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-olt"
            nrOfLevels={25}
            colors={["#00FF00", "#FF0000"]}
            arcWidth={0.3}
            percent={computePercentage(oltCounts)}
            textColor="#000000"
          />
          <h3>OLTs</h3>
          <p>
            Active: {oltCounts.active}, Dead: {oltCounts.dead} (Total: {oltCounts.total})
          </p>
        </div>

        {/* Slot Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-slot"
            nrOfLevels={25}
            colors={["#00FF00", "#FF0000"]}
            arcWidth={0.3}
            percent={computePercentage(slotCounts)}
            textColor="#000000"
          />
          <h3>Slots</h3>
          <p>
            Active: {slotCounts.active}, Dead: {slotCounts.dead} (Total: {slotCounts.total})
          </p>
        </div>

        {/* PON Port Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-ponport"
            nrOfLevels={25}
            colors={["#00FF00", "#FF0000"]}
            arcWidth={0.3}
            percent={computePercentage(ponPortCounts)}
            textColor="#000000"
          />
          <h3>PON Ports</h3>
          <p>
            Active: {ponPortCounts.active}, Dead: {ponPortCounts.dead} (Total: {ponPortCounts.total})
          </p>
        </div>

        {/* ONT Gauge */}
        <div className="text-black text-center">
          <GaugeChart
            id="gauge-chart-ont"
            nrOfLevels={25}
            colors={["#00FF00", "#FF0000"]}
            arcWidth={0.3}
            percent={computePercentage(ontCounts)}
            textColor="#000000"
          />
          <h3>ONTs</h3>
          <p>
            Active: {ontCounts.active}, Dead: {ontCounts.dead} (Total: {ontCounts.total})
          </p>
        </div>
      </div>

    </div>
  );
}

export default GaugeChartComponent;
