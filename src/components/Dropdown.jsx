import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ title, children, onItemSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName) => {
    setIsOpen(false); // Dropdown kapat
    onItemSelect(itemName); // Parent component'e bilgi gönder
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownClasses = `origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg bg-[#121829] transition-transform duration-300 opacity-100 text-[#ced0d4] cursor-pointer ${
    isOpen ? "ease-out scale-y-100" : "ease-in scale-y-0"
  }`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-[#171c2c] p-1 font-bold rounded-sm text-[#ced0d4] hover:text-gray-100 flex items-center gap-1"
        onClick={handleButtonClick}
      >
        {title}
        <span className="material-symbols-outlined text-[#dd8e32] text-sm">
          menu
        </span>
      </button>
      <div
        className={dropdownClasses}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: () => handleItemClick(child.props.children),
          })
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default Dropdown;
