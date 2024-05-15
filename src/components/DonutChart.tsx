"use client";
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

interface DonutChartProps {
  label: string[];
  numberData: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ label, numberData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        if ((canvas as any).chart) {
          (canvas as any).chart.destroy();
        }

        const newChart = new Chart(context, {
          type: "pie",
          data: {
            labels: label,
            datasets: [
              {
                label: "Leave",
                data: numberData,
                borderWidth: 1,
              },
            ],
          }, 
          options: {
            responsive: true,
          },
        });

        (canvas as any).chart = newChart;
      }
    }

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (canvas && (canvas as any).chart) {
        (canvas as any).chart.destroy();
      }
    };
  }, [label, numberData]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DonutChart;
