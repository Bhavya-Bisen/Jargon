"use client";

import React, { useState } from 'react'

export const Header = () => {

  const [isClick , setisClick] = useState(false);

  const toggleNavbar=() =>{
    setisClick(!isClick);
  }
  return (
    <>
      <div className='flex items-center justify-between h-[93px] px-4 sm:px-6 lg:px-8'>
        <img 
          src='Logo.png' 
          alt='Top-Logo' 
          className='w-[112px] h-[69px]' 
        />  
        <div className='ml-4 flex items-center space-x-4'>
          <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
            Login
          </a>
          <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
            Sign Up
          </a>
        </div>      
      </div>

      <nav className='w-full'>
        <div className=' bgnav max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
            <div className=' flex items-center justify-between h-16'>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center space-x-4'>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Home
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Performance board
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Help Centre & Tools
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Banking & Remittance
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Dak Portal
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Retail Services
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Mail & Stamps
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      News & Media Outlet
                    </a>
                    <a href='/' className=' textnav hover:bg-white hover:text-black rounded-lg p-2 '>
                      Business Section
                    </a>
                  </div>
                </div>
            </div>
            <div className=' md:hidden flex items-center'>
              <button className='inline-flex items-center justify-center p-2 rounded-md textnav md:textnav
              hover:textnav focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              onClick={toggleNavbar}>
                {isClick ? (
                  <svg  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor" >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"/>
                  </svg>
                )}
              </button>
            </div>
            {isClick && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Home
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Performance board
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Help Centre & Tools
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Banking & Remittance
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Dak Portal
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Retail Services
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Mail & Stamps
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      News & Media Outlet
                    </a>
                    <a href='/' className=' textnav block hover:bg-white hover:text-black rounded-lg p-2 '>
                      Business Section
                    </a>
            </div>
          </div>
        )}
        </div>
      </nav>
    </>
  )
}