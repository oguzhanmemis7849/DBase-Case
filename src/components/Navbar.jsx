import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Tag from "./Tag";
import menuItems from "../constants";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleItems, setVisibleItems] = useState([]);
  const [invisibleItems, setInvisibleItems] = useState([]);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    updateVisibleItems();
  }, [windowWidth]);

  const updateVisibleItems = () => {
    if (windowWidth > 992) {
      setVisibleItems(menuItems);
      setInvisibleItems([]);
    } else {
      let itemsToShow = [];
      let itemsToHide = [];
      let totalWidth = 0;

      for (const element of menuItems) {
        const item = element;
        const itemWidth = 144; // Example element width

        if (totalWidth + itemWidth <= windowWidth - 100) {
          itemsToShow.push(item);
          totalWidth += itemWidth;
        } else {
          itemsToHide.push(item);
        }
      }

      setVisibleItems(itemsToShow);
      setInvisibleItems(itemsToHide);
    }
  };

  const handleDropdownItemClick = (itemName) => {
    console.log(itemName);
  };

  return (
    <nav className="w-full">
      <ul className="px-6 flex items-center justify-between">
        {visibleItems.map((item, index) => (
          <li key={index} className="relative">
            <Link
              to={item.to}
              className="flex items-center gap-1 text-[#ced0d4] hover:text-gray-100 whitespace-nowrap"
            >
              {item.icon && (
                <span className="material-symbols-outlined text-[#dd8e32] text-sm">
                  {item.icon}
                </span>
              )}
              <p className="font-semibold">{item.name}</p>
              <div className="absolute -top-[10px] left-0">
                {item.tag && (
                  <Tag backgroundColor={item.tagColor}>{item.tag}</Tag>
                )}
              </div>
            </Link>
          </li>
        ))}
        {windowWidth <= 992 ? (
          <Dropdown
            title={`+${invisibleItems.length}`}
            onItemSelect={handleDropdownItemClick}
          >
            {invisibleItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center justify-between p-2 hover:bg-[#1e2741] hover:rounded-sm"
              >
                <div className="flex items-center gap-1 text-[#ced0d4]  whitespace-nowrap">
                  {item.icon && (
                    <span className="material-symbols-outlined text-[#dd8e32] text-sm">
                      {item.icon}
                    </span>
                  )}
                  {item.name}
                </div>
                <div>
                  {item.tag && (
                    <Tag backgroundColor={item.tagColor}>{item.tag}</Tag>
                  )}
                </div>
              </Link>
            ))}
          </Dropdown>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
