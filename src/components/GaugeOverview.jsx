import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

const GaugeOverview = ({ data }) => {
  const [selectedCO, setSelectedCO] = useState("");
  const [visibleCharts, setVisibleCharts] = useState(["OLTs", "Slots", "PON Ports", "ONTs"]);

  const categories = [
    { label: "OLTs", keyword: "OLT" },
    { label: "Slots", keyword: "Slot" },
    { label: "PON Ports", keyword: "PON Port" },
    { label: "ONTs", keyword: "ONT" },
  ];

  const findNodesByName = (node, keyword) => {
    let matches = [];
    if (node.name.includes(keyword)) {
      matches.push(node);
    }
    if (node.children) {
      for (const child of node.children) {
        matches = matches.concat(findNodesByName(child, keyword));
      }
    }
    return matches;
  };

  const calculatePercentage = (keyword) => {
    const root = selectedCO
      ? data.children.find((co) => co.name === selectedCO)
      : data;

    if (!root) return 0;

    const nodes = findNodesByName(root, keyword);
    const upCount = nodes.filter((node) => node.status === "up").length;
    const total = nodes.length;

    return total > 0 ? upCount / total : 0;
  };

  const calculateGaugeColors = (percentage) => {
    const green = percentage; // Proportion of green (up)
    const red = 1 - percentage; // Proportion of red (down)
    return [
      `rgba(0, 255, 0, ${green})`, // Green (up) with dynamic opacity
      `rgba(255, 0, 0, ${red})`, // Red (down) with dynamic opacity
    ];
  };

  useEffect(() => {
    console.log("Data received in GaugeOverview:", JSON.stringify(data, null, 2));
    console.log("Selected CO:", selectedCO);
  }, [data, selectedCO]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-center font-serif font-bold mb-4">Device Overview</h2>

      {/* CO Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select CO:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCO}
          onChange={(e) => setSelectedCO(e.target.value)}
        >
          <option value="">-- All COs --</option>
          {data.children.map((co) => (
            <option key={co.name} value={co.name}>
              {co.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Select Gauges to Display:
        </label>
        <div className="flex flex-wrap gap-4">
          {categories.map(({ label }) => (
            <label key={label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={visibleCharts.includes(label)}
                onChange={(e) => {
                  setVisibleCharts((prev) =>
                    e.target.checked
                      ? [...prev, label]
                      : prev.filter((item) => item !== label)
                  );
                }}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gauge Charts */}
      <div className="flex flex-wrap justify-between gap-8">
        {visibleCharts.map((label) => {
          const category = categories.find((cat) => cat.label === label);
          const percentage = calculatePercentage(category.keyword);

          return (
            <div key={label} className="flex flex-col items-center w-1/4">
              <GaugeChart
                id={`gauge-chart-${label}`}
                nrOfLevels={15} // More levels for smoother transition
                colors={calculateGaugeColors(percentage)} // Dynamic colors
                arcWidth={0.2} // Thickness of the arc
                percent={percentage} // Percentage of "up" devices
                textColor="" // Remove percentage label
              />
              <h3 className="text-center font-serif font-semibold">{label}</h3>
              <p className="text-center text-sm">
                {(percentage * 100).toFixed(0)}% are up.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GaugeOverview;
