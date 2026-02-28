import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

const StatsPage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    if (!ctx) return;

    // destroy old chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan 1, 2025",
          "Jan 2, 2025",
          "Jan 3, 2025",
          "Jan 4, 2025",
          "Jan 5, 2025",
          "Jan 6, 2025",
        ],
        datasets: [
          {
            label: "Followers",
            data: [10, 100, 500, 1000, 1500, 200],
            borderWidth: 1,
            pointBorderWidth: 0,
            pointRadius: 0,
            borderJoinStyle: "round",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-20 py-10">
      <header className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Professional Dashboard</h2>
      </header>

      <section>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Followers</h3>
            <p className="text-3xl font-bold mt-2">1,234</p>
            <span className="text-green-500 text-sm">↑ 12%</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Likes</h3>
            <p className="text-3xl font-bold mt-2">1,2004</p>
            <span className="text-green-500 text-sm">↑ 78%</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Comments</h3>
            <p className="text-3xl font-bold mt-2">134</p>
            <span className="text-green-500 text-sm">↑ 2%</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Searches</h3>
            <p className="text-3xl font-bold mt-2">1,004</p>
            <span className="text-green-500 text-sm">↑ 10%</span>
          </div>
        </div>

        {/* Graph card */}
        <div className="mt-5 bg-white rounded-2xl shadow-sm p-6">
          {/* Graph header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Overall Growth</h3>

            <select className="text-sm border rounded-lg px-3 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>

          {/* Chart area */}
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            <canvas ref={chartRef} id="myChart"></canvas>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsPage;
