// Dropdown.tsx
"use client";
import { MenuItem } from './type'; 

import React, { useState, useRef, useEffect } from 'react';

interface SubmenuItem {
  label: string;
  href?: string;
  submenuItems?: SubmenuItem[];
}

interface DropdownProps {
  label: string;
  menuName: string;
  submenuItems?: MenuItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, menuName, submenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='text-center textnav hover:bg-[rgba(205, 162, 116, 0.3)] hover:text-[rgba(112, 65, 22, 1)] rounded-lg p-2 focus:outline-none flex items-center'
      >
        {label}
        {submenuItems && submenuItems.length > 0 && (
          <svg
            className='ml-1 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1
              1 0 111.414 1.414l-4 4a1 1 0
              01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </button>
      {isOpen && submenuItems && submenuItems.length > 0 && (
        <div
          className={`${
            menuName !== 'top-level' ? 'absolute left-full top-0' : 'absolute left-0 mt-2'
          } w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10`}
        >
          <div className='py-1'>
            {submenuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.submenuItems ? (
                  <Dropdown
                    label={item.label}
                    menuName={item.label}
                    submenuItems={item.submenuItems}
                  />
                ) : (
                  <a
                    href={item.href}
                    className='block px-4 py-2 text-sm textnav hover:bg-[rgba(194,182,168,1)]'
                  >
                    {item.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
