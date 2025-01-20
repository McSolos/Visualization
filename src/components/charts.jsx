import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const ChartCard = ({ title, data, labels, colors, description }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64">
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <Doughnut data={chartData} options={chartOptions} />
      <p className="mt-4 text-center text-xs">{description}</p>
    </div>
  );
};

const Chart = ({ data }) => {
  const colors = ["#3B82F6", "#06B6D4", "#F97316", "#10B981"]; // Blue, Cyan, Orange, Green

  // Helper function to count items at a specific level
  const countByCentralOffice = (centralOffices, getCountFn) =>
    centralOffices.map((co) => getCountFn(co));

  // Specific counting functions
  const countOLTs = (co) => (co.OLTs ? co.OLTs.length : 0);
  const countSlots = (co) =>
    (co.OLTs || []).reduce((sum, olt) => sum + (olt.slots ? olt.slots.length : 0), 0);
  const countPONPorts = (co) =>
    (co.OLTs || []).reduce(
      (sum, olt) =>
        sum +
        (olt.slots || []).reduce((slotSum, slot) => slotSum + (slot.PONPorts ? slot.PONPorts.length : 0), 0),
      0
    );
  const countONTs = (co) =>
    (co.OLTs || []).reduce(
      (sum, olt) =>
        sum +
        (olt.slots || []).reduce(
          (slotSum, slot) =>
            slotSum +
            (slot.PONPorts || []).reduce((portSum, port) => portSum + (port.ONTs ? port.ONTs.length : 0), 0),
          0
        ),
      0
    );

  // Labels and data for each chart
  const coLabels = data.network.centralOffices.map((co) => co.description);

  const oltData = countByCentralOffice(data.network.centralOffices, countOLTs);
  const slotData = countByCentralOffice(data.network.centralOffices, countSlots);
  const portData = countByCentralOffice(data.network.centralOffices, countPONPorts);
  const ontData = countByCentralOffice(data.network.centralOffices, countONTs);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <div>
        <ChartCard
          title="All OLTs Summary"
          data={oltData}
          labels={coLabels}
          colors={colors}
          description={coLabels
            .map((label, idx) => `${label}: ${oltData[idx]} OLTs`)
            .join(", ")}
        />
      </div>
      <div>
        <ChartCard
          title="All Slots Summary"
          data={slotData}
          labels={coLabels}
          colors={colors}
          description={coLabels
            .map((label, idx) => `${label}: ${slotData[idx]} Slots`)
            .join(", ")}
        />
      </div>
      <div>
        <ChartCard
          title="All PON Ports Summary"
          data={portData}
          labels={coLabels}
          colors={colors}
          description={coLabels
            .map((label, idx) => `${label}: ${portData[idx]} PON Ports`)
            .join(", ")}
        />
      </div>
      <div>
        <ChartCard
          title="All ONTs Summary"
          data={ontData}
          labels={coLabels}
          colors={colors}
          description={coLabels
            .map((label, idx) => `${label}: ${ontData[idx]} ONTs`)
            .join(", ")}
        />
      </div>
    </div>
  );
};

export default Chart;
