import React, { useState, useRef, useEffect } from 'react';

export const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children, isOpen, setIsOpen, className }) => (
  <div onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer ${className}`}>
    {children}
  </div>
);

export const DropdownMenuContent = ({ children, isOpen, className }) => (
  isOpen ? (
    <div className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${className}`}>
      <div className="py-1">{children}</div>
    </div>
  ) : null
);

export const DropdownMenuItem = ({ children, onSelect, className }) => (
  <div
    className={`block px-4 py-2 text-sm cursor-pointer ${className}`}
    onClick={onSelect}
  >
    {children}
  </div>
);

export const DropdownMenuSeparator = ({ className }) => (
  <div className={`border-t my-1 ${className}`}></div>
);