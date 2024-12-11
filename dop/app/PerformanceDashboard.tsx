"use client";

import { useEffect,useRef, useState } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


interface DashboardData {
  message: string;
  Average_Delivery_Time: {
    Average_Delivery_Time_Days: string;
  };
  On_Time_Delivery_Rate: {
    On_Time_Delivery_Rate_Percentage: string;
  };
  Delayed_Number_Deliveries: {
    Delayed_Deliveries_Count: string;
  };
  Delayed_Percentage_Deliveries: {
    Delayed_Deliveries_Percentage: string;
  };
  Total_Deliveries: {
    Total_Deliveries: string;
  };
  Total_On_Time_Delivery: {
    On_Time_Deliveries: string;
  };
  Average_Delivery_Speed_Post_Local: {
    Average_Delivery_Time_Speed_Post_Local: string;
  };
  Average_Delivery_Speed_Post_Metro: {
    Average_Delivery_Time_Speed_Post_Metro: string;
  };
  Average_Delivery_Speed_Post_Same_State: {
    Average_Delivery_Time_Speed_Post_Same_State: string;
  };
  Average_Delivery_Speed_Post_Capital_to_Capital_State: {
    Average_Delivery_Time_Speed_Post_Capital_to_Capital_State: string;
  };
  Average_Delivery_Speed_Post_Rest_of_the_Country: {
    Average_Delivery_Time_Speed_Post_Rest_of_the_Country: string;
  };
}

export default function PerformanceDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  // Fetch data from the backend
  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Render chart when second div is shown
  useEffect(() => {
    if (!showFirstDiv && data && chartRef.current) {
      // Clean up existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null; // Reset reference
      }

      // Create new chart instance
      chartInstance.current = new ChartJS(chartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Local",
            "Metro",
            "Same State",
            "Capital to Capital",
            "Rest of Country",
          ],
          datasets: [
            {
              label: "Average Speed Post Delivery Time (Days)",
              data: [
                parseFloat(data.Average_Delivery_Speed_Post_Local.Average_Delivery_Time_Speed_Post_Local),
                parseFloat(data.Average_Delivery_Speed_Post_Metro.Average_Delivery_Time_Speed_Post_Metro),
                parseFloat(data.Average_Delivery_Speed_Post_Same_State.Average_Delivery_Time_Speed_Post_Same_State),
                parseFloat(data.Average_Delivery_Speed_Post_Capital_to_Capital_State.Average_Delivery_Time_Speed_Post_Capital_to_Capital_State),
                parseFloat(data.Average_Delivery_Speed_Post_Rest_of_the_Country.Average_Delivery_Time_Speed_Post_Rest_of_the_Country),
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [showFirstDiv, data]);


  // Loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  const handleToggle = () => {
    setShowFirstDiv((prev) => !prev);
  };

  return (
    <div className="block justify-center mt-10">
      <div className="flex justify-center items-center">
        <div className="rounded-full border border-[rgba(112,65,22,1)] justify-center bg-[rgba(194,182,168,0.74)] w-[518px] h-[46px]">
          <a className="text-[rgba(112,65,22,1)] justify-center flex items-center font-bold text-3xl pb-4" href="/">
            Performance Dashboard
          </a>
        </div>
      </div>
      {showFirstDiv ? (
        <div className="flex justify-around items-start h-[547px] w-full mt-5">
          <ul>
            <div className="inline-flex ml-10">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Average ROC Speed Post Delivery Time</a>
                <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{parseFloat(data.Average_Delivery_Time.Average_Delivery_Time_Days).toFixed(2)} Days</span>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Average Local Speed Post Delivery Time</a>
              </li>
            </div>
            <div className="inline-flex">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Delayed Percentage Deliveries</a>
                <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{parseFloat(data.Delayed_Percentage_Deliveries.Delayed_Deliveries_Percentage).toFixed(2)}%</span>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Total number of Delivery</a>
                <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{data.Total_Deliveries.Total_Deliveries}</span>
              </li>
            </div>
            <div className="inline-flex ml-10">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Total Delayed number of Deliveries</a>
                <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{data.Delayed_Number_Deliveries.Delayed_Deliveries_Count}</span>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Total On-time Delivery</a>
                <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{data.Total_On_Time_Delivery.On_Time_Deliveries}</span>
              </li>
            </div>
            <div className="inline-flex">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Average Capital Speed Post Delivery Time</a>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">On-Time Delivery Rate</a>
                <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{parseFloat(data.On_Time_Delivery_Rate.On_Time_Delivery_Rate_Percentage).toFixed(2)}%</span>
              </li>
            </div>
          </ul>
        </div>
      ) : (
        <div className="flex h-[100%] w-[100%] justify-center items-center">
          <div className="flex justify-center items-center h-[547px] w-[1279px] mt-5">
            <canvas ref={chartRef} className="w-[90%] h-[90%]"></canvas>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-9">
        <button
          onClick={handleToggle}
          className={`rounded-full mt-9 w-[80px] h-[80px] border-2 
            ${showFirstDiv ? "bg-[rgba(228,226,214,1)] border-[rgba(194,182,168,1)]" 
                           :"bg-[rgba(165,110,65,1)] border-[rgba(112,65,22,1)]" }`}
        >
          {showFirstDiv ? " " : " "}
        </button>
      </div>
    </div>
  );
}
