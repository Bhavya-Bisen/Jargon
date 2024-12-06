// Header.tsx
"use client";

import React from 'react';
import Navbar from './Navbar'; // Adjust the import path accordingly

interface HeaderProps {
  bannerSrc?: string; // Optional banner source
}

export const Header: React.FC<HeaderProps> = ({ bannerSrc }) => {
  return (
    <>
      {/* Top Header */}
      <div className='flex items-center justify-between h-[75px] px-4 sm:pr-6 lg:pr-8'>
        <img src='/Logo.png' alt='Top-Logo' className='w-[112px] h-[69px]' />
        <div className='ml-4 flex items-center space-x-4 bgnav rounded-lg '>
          <a
            href='/login'
            className='text-center textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 '
          >
            Login
          </a>
          <a
            href='/signup'
            className='text-center textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 '
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* Include the Navbar */}
      <Navbar />

      {/* Rest of your code */}
      <div>
        <img
          src={bannerSrc}
          alt='Banner-Homepage'
          className='flex items-center justify-between gap-0 w-[1128px] h-[643px] mx-auto mt-0 pt-5 pb-16'
        />
      </div>
    </>
  );
};
