"use client";

import { useEffect, useState } from 'react';
import PerformanceDashboard from "./PerformanceDashboard";
import Link from 'next/link';
export default function Home() {

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
              <img src="/TrackNTrace.png" 
                   className="w-[150px] h-[132px]"/>
              <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                Track N Trace
              </a>
            </li>
            <Link href="/LocatePO" passHref>
              <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                <img src="/LocatePostOffice.png" 
                    className="w-[150px] h-[132px]"/>
                <span className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                  Locate PostOffice
                </span>
              </li>
            </Link>
            <li className="bg-[rgba(228,226,214,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
              <img src="/News.png" 
                   className="w-[150px] h-[132px]"/>
              <a className="text-[rgba(112,65,22,1)]  text-center font-bold text-3xl pb-4">
                News
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <PerformanceDashboard  />

      <div className="block justify-center">
        <div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start pt-20 px-20">
          <div className="w-[350px] h-[400px] m-6 flex flex-col items-center">
            <img 
              src="/MOC.jpg" 
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
              src="/MOS.png" 
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