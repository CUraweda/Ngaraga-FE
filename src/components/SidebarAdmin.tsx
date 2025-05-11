import React, { useEffect, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { iconMapping } from "./IconMapping";
import { Link } from "react-router-dom";

import { sidebarList } from "@/constant/sidebarItem";
import { listedParamAdmin } from "@/constant/listed.param";

interface Menu {
  label: string;
  path: string;
  icon: string;
  subLabel?: Subtitle[];
  permission?: string[];
}

type Subtitle = {
  label: string;
  path: string;
  permission?: string[];
};

interface SidebarProps {
  logo: string;
}

const Sidebar: React.FC<SidebarProps> = ({ logo }) => {
  const Side = sessionStorage.getItem("side") || "/";
  const [data, setData] = useState<any[]>([]);
  const [activeMenuItem, setActiveMenuItem] = useState<string>(Side);

  const handleMenuItemClick = (name: string) => {
    setActiveMenuItem(name);
    sessionStorage.setItem("side", name);
  };

  useEffect(() => {
    Side ? setActiveMenuItem(Side) : setActiveMenuItem(listedParamAdmin.home);
    setData(
      sidebarList
      //   sidebarList.filter((item) =>
      //     item.permission?.some(
      //       (permission) => sessionStorage.getItem(permission) === 'true'
      //     )
      //   )
    );
  }, []);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu p-4 w-60 bg-base-200 min-h-screen shadow top-0 sticky">
            <div className="w-full flex justify-between mb-10 items-center pb-6">
              <div className="flex justify-start items-start gap-1 w-full">
                <img src={logo} alt="logo curaweda" className="w-40" />
              </div>
              <label
                htmlFor="my-drawer-2"
                className="text-3xl font-bold lg:hidden"
              >
                <RiCloseLargeFill />
              </label>
            </div>
            <ul className="menu max-w-xs w-full text-base-400">
              {data.map((item: Menu, index: number) => (
                <React.Fragment key={`menu-${index}`}>
                  {item.subLabel && item.subLabel.length > 0 ? (
                    <li className="my-2">
                      <details>
                        <summary>
                          <span className="text-xl"> {iconMapping[item.icon]}</span>
                          <a>{item.label}</a>
                        </summary>
                        <ul>
                          {item.subLabel?.map(
                            (subItem: Subtitle, subIndex: number) => (
                              <Link to={subItem.path} key={`link-${subIndex}`}>
                                <li
                                  className={`my-2 transition duration-200 ${
                                    activeMenuItem === subItem.path
                                      ? "bg-white border-amber-400 border-2  text-amber-500 font-bold rounded-xl"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleMenuItemClick(subItem.path)
                                  }
                                >
                                  <p>{subItem.label}</p>
                                </li>
                              </Link>
                            )
                          )}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    <Link to={item.path} key={`link-${index}`}>
                      <li
                        className={`my-2 transition duration-200 ${
                          activeMenuItem === item.path
                            ? "bg-white border-amber-400 border-2  text-amber-500 font-bold rounded-xl"
                            : ""
                        }`}
                        onClick={() => handleMenuItemClick(item.path)}
                      >
                        <div>
                          <span className="text-xl">{iconMapping[item.icon]}</span>
                          <p>{item.label}</p>
                        </div>
                      </li>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
