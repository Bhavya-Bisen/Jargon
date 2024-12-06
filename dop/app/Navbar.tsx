"use client";

import React, { useState } from 'react';
import Dropdown from './Dropdown'; // Adjust the import path
import { MenuItem } from './type'; 

const Navbar: React.FC = () => {
  const [isClick, setIsClick] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const toggleMobileDropdown = (menuName: string) => {
    if (openMobileDropdown === menuName) {
      setOpenMobileDropdown(null);
    } else {
      setOpenMobileDropdown(menuName);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Performance Board',
      href: '/',
    },
    {
      label: 'Tools & Help Center',
      menuName: 'tools',
      submenuItems: [
        { label: 'Locate Post Office', href: '/locate-post-office' },
        { label: 'Track N Trace', href: '/track-n-trace' },
        { label: 'Calculate Postage', href: '/calculate-postage' },
        { label: 'Delivery History', href: '/delivery-history' },
        { label: 'Support', href: '/support' },
      ],
    },
    {
      label: 'Banking & Remittance',
      menuName: 'banking',
      submenuItems: [
        { label: 'Post Office Saving Scheme', 
          menuName:'PO_Saving' ,
          submenuItems:[
            {label:'Saving Schemes',href: '/' },
            {label:'ePassbook',href:'/'},
            {label:'KYC Norms',href:'/'},
            {label:'FAQs on Banking',href:'/'},
            {label:'Senior Citizen Welfare Fund',href:'/'},
            {label:'Previous Interest Rates',href:'/'},
            {label:'Safetly guidelines for investors',href:'/'},
          ]},
        { label:'Electronic Money Order (eMO)',href:'/'},
        { label:'IFS Money Order',href:'/'},
        { label:'Jansuraksha Scheme',href:'/'},
        { label:'Mutual Funds',href:'/'},
        { label:'National Pension System - Online Services',
          menuName:'NPS' ,
          submenuItems:[
            {label:'All About',href:'/'},
            {label:'Tax Benefit',href:'/'},
            {label:'Account Types/Contributions',href:'/'},
            {label:'Withdrawal/Cost',href:'/'},
            {label:'Online Services',href:'/'},
          ]},
        { label:'Electronic Clearance Service(ECS)',
          menuName:'ECS' ,
          submenuItems:[
            {label:'Overview',href:'/'},
            {label:'Location where RBI is managing ECS',href:'/'},
            {label:'Location where SBI is managing ECS',href:'/'},
          ]},
        { label:'Services through IPPB',href:'/'},
      ],
    },
    {
      label: 'Dak Portal',
      menuName:'Dak',
      submenuItems:[
        {label:'Dak Ghar Niryat Portal',href:'https://dnk.cept.gov.in/customers.web/'},
        {label:'Dak Karmayogi Portal',href:"https://dnk.cept.gov.in/customers.web/"},
      ]},
    {
      label: 'Retail Services',
      menuName:'Retail',
      submenuItems:[
        {label:'Retail Post',href:'/'},
        {label:'Aadhaar Services',href:"/"},
        {label:'Gangajal Services',
         menuName:'Gangajal',
         submenuItems:[
            {label:'Overview',href:'/'},
            {label:'Tariff',href:"/"},
      ]},
        {label:'Post Office Passport Seva Kendras',href:"/"},
        {label:'Prasadam (Holy Blessing)',href:"/"},
        {label:'Passenger Reservation System(PRS)',href:"/"},
      ]},
    {
      label: 'Mail & Stamps',
      href: '/',
    },
    {
      label: 'News & Media Outlet',
      menuName:'News',
      submenuItems:[
        {label:'News & Updates',href:'/'},
        {label:'Tendor',href:"/"},
        {label:'Recuitement',href:'/'},
        {label:'Notifications',href:"/"},
      ]},
    {
      label: 'Business Section',
      menuName:'Business',
      submenuItems:[
        {label:'Book Now Pay Later (BNPL)',href:'/'},
        {label:'Cash on Delivery (COD) Facility',href:'/'},
        {label:'Speed Post Discount Structure',href:'/'},
        {label:'Bill Mail',href:'/'},
        {label:'Direct Mail',href:'/'},
        {label:'Media Post',href:'/'},
        {label:'Business Post',href:'/'},
        {label:'Logistics Post',href:'/'},
        {label:'e-Payment',href:'/'},
        {label:'e-Post',href:'/'},
    ]},
    {
      label: 'Stamps',
      menuName:'Stamps',
      submenuItems:[
        {label:'Commemorative Stamps',href:'/'},
        {label:'Definitive Stamps',href:'/'},
        {label:'Buy Stamps',href:'/'},
        {label:'My Stamps',href:'/'},
        {label:'Philatelic Deposit Account',href:'/'},
        {label:'Stamp Catalogue',href:'https://postagestamps.gov.in/Stamps.aspx'},
        {label:'Stamp Calendar',href:'/'},
        {label:'Deen Dayal SPARSH Yojana',href:'/'},
        {label:'India Postage Stamps',href:'https://postagestamps.gov.in/'}
      ]
      },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className='w-full'>
        <div className='bgnav max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Desktop Menu */}
            <div className='hidden md:block'>
              <div className='ml-4 flex items-center space-x-4'>
                {menuItems.map((item: MenuItem, index: number) => (
                  <React.Fragment key={index}>
                    {item.submenuItems ? (
                      <Dropdown
                        label={item.label}
                        menuName={item.menuName || 'nested'}
                        submenuItems={item.submenuItems}
                      />
                    ) : (
                      <a
                        href={item.href}
                        className='text-center textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 '
                      >
                        {item.label}
                      </a>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center'>
              <button
                className='inline-flex items-center justify-center p-2 rounded-md textnav hover:text-[rgba(112, 65, 22, 1)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                ) : (
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isClick && (
            <div className='md:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                {menuItems.map((item: MenuItem, index: number) => (
                  <div key={index}>
                    {item.submenuItems && item.submenuItems.length > 0 ? (
                      <div>
                        <button
                          onClick={() => toggleMobileDropdown(item.label)}
                          className='block w-full text-left textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 focus:outline-none items-center'
                        >
                          {item.label}
                          <svg
                            className='ml-1 h-4 w-4'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.293 7.293a1 1 0 011.414 0L10
                              10.586l3.293-3.293a1 1 0
                              111.414 1.414l-4 4a1 1 0
                              01-1.414 0l-4-4a1 1 0
                              010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                        {openMobileDropdown === item.label && (
                          <div className='pl-4'>
                            {item.submenuItems.map((subItem: MenuItem, subIndex: number) => (
                              <div key={subIndex}>
                                {subItem.submenuItems ? (
                                  <>
                                    <button
                                      onClick={() => toggleMobileDropdown(subItem.label)}
                                      className='block w-full text-left textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 focus:outline-none items-center'
                                    >
                                      {subItem.label}
                                      <svg
                                        className='ml-1 h-4 w-4'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                      >
                                        <path
                                          fillRule='evenodd'
                                          d='M5.293 7.293a1 1 0 011.414 0L10
                                          10.586l3.293-3.293a1 1 0
                                          111.414 1.414l-4 4a1 1 0
                                          01-1.414 0l-4-4a1 1 0
                                          010-1.414z'
                                          clipRule='evenodd'
                                        />
                                      </svg>
                                    </button>
                                    {openMobileDropdown === subItem.label && (
                                      <div className='pl-4'>
                                        {subItem.submenuItems.map((nestedItem: MenuItem, nestedIndex: number) => (
                                          <a
                                            key={nestedIndex}
                                            href={nestedItem.href}
                                            className='block textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 '
                                          >
                                            {nestedItem.label}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <a
                                    href={subItem.href}
                                    className='block textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 '
                                  >
                                    {subItem.label}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className='block text-center textnav hover:bg-[rgba(194,182,168,1)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 '
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

  