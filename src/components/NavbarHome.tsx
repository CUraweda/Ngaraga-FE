import React from "react";
import logo from "@/assets/Logo.png";
import { CiShoppingCart } from "react-icons/ci";
const NavbarHome = () => {
  return (
    <div className="w-full">
      <div className="navbar bg-white shadow-sm w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Marketplace</a>
              </li>

              <li>
                <a>Top Collector</a>
              </li>
              <li>
                <a>Event</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Marketplace</a>
            </li>

            <li>
              <a>Top Collector</a>
            </li>
            <li>
              <a>Event</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          <a className="btn btn-ghost text-2xl">
            <CiShoppingCart />
          </a>
          <a className="btn btn-outline text-amber-500">Sign In</a>
          <a className="btn bg-amber-400 text-white">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;
