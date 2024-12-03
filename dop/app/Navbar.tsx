import React from 'react'

export const Navbar = () => {
  return (
    <>
      <div className=''>
        <img src='Logo.png' alt='Top-Logo' className='absolute w-[112px] h-[69px] top-[20px] left-[12px]' />        
      </div>

      <nav className='pt-[93px] w-full'>
        <div className=' bgnav max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
            <div className=' flex items-center justify-between h-16'>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center space-x-4'>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Home
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Performance board
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Help Centre & Tools
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Banking & Remittance
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Dak Portal
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Retail Services
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Mail & Stamps
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      News & Media Outlet
                    </a>
                    <a href='/' className=' text-white hover:bg-white hover:text-black rounded-lg p-2 '>
                      Business Section
                    </a>
                  </div>
                </div>
            </div>
        </div>
      </nav>
    </>
  )
}