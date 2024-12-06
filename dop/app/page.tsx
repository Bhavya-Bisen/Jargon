"use client";

import { useEffect, useState } from 'react';

export default function Home() {

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
  }

  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Fetch data from your backend endpoint
    fetch('http://localhost:5000/dashboard')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // If data is not yet loaded, you can show a loading state
  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
      <>
      <div className="block justify-center">
        <div className="flex justify-center items-center   ">
          <div className=" rounded-full border border-[rgba(112,65,22,1)] justify-center bg-[rgba(194,182,168,0.74)] w-[180px]  h-[46px] ">
              <a className="text-[rgba(112,65,22,1)] justify-center flex items-center font-bold text-3xl pb-4"
                href="/">
                Services
              </a>
          </div>
        </div>
        <div className="flex justify-around items-start h-1/2 w-full mt-5">
          <ul>
            <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
              <img src="TrackNTrace.png" 
                   className="w-[150px] h-[132px]"/>
              <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Track N Trace
              </a>
            </li>
            <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
              <img src="LocatePostOffice.png" 
                   className="w-[150px] h-[132px]"/>
              <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Locate PostOffice
              </a>
            </li>
            <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
              <img src="News.png" 
                   className="w-[150px] h-[132px]"/>
              <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                News
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="block justify-center mt-10">
        <div className="flex justify-center items-center   ">
          <div className=" rounded-full border border-[rgba(112,65,22,1)] justify-center bg-[rgba(194,182,168,0.74)] w-[518px]  h-[46px] ">
              <a className="text-[rgba(112,65,22,1)] justify-center flex items-center font-bold text-3xl pb-4"
                href="/">
                Performance Dashboard
              </a>
          </div>
        </div>
        <div className="flex justify-around items-start h-1/2 w-full mt-5">
          <ul>
            <div className="inline-flex ml-10">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Average Delivery Time
                </a>
                <span>{data.Average_Delivery_Time?.Average_Delivery_Time_Days}</span>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Average Resolution Time
                </a>
                
              </li>
            </div>
            <div className="inline-flex ">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Delayed Percentage Deliveries
                </a>
                <span>{data.Delayed_Percentage_Deliveries.Delayed_Deliveries_Percentage}%</span>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Total number of  Delivery
                </a>
                <span>{data.Total_Deliveries.Total_Deliveries}</span>
              </li>
            </div>
            <div className="inline-flex ml-10">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Total Delayed number of Deliveries
                </a>
                <span>{data.Delayed_Number_Deliveries.Delayed_Deliveries_Count}</span>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Total On time Delivery
                </a>
                <span>{data.Total_On_Time_Delivery.On_Time_Deliveries}</span>
              </li>
            </div>
            <div className="inline-flex ">
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Transaction Processing Time
                </a>
              </li>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                On-Time Delivery Rate
                </a>
                <span>{data.On_Time_Delivery_Rate.On_Time_Delivery_Rate_Percentage}%</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="block justify-center">
        <div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start pt-20 px-20">
          <div className="w-[350px] h-[400px] m-6 flex flex-col items-center">
            <img 
              src="MOC.jpg" 
              alt="MOC"
              className="rounded-full w-[300px] h-[300px]"
            />
            <a 
              className="text-[rgba(112,65,22,1)] text-4xl mt-4 text-center"
            >
              MOC, Shri Jyotiraditya M. Scindia
            </a>
          </div>
          <div className="w-[350px] h-[400px] m-6 flex flex-col items-center">
            <img 
              src="MOS.png" 
              alt="MOS"
              className="rounded-full w-[300px] h-[300px]"
            />
            <a 
              className="text-[rgba(112,65,22,1)] text-4xl mt-4 text-center"
            >
              MOS, Dr. Chandra Sekhar Pemmasani
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

