/* eslint-disable */
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

// Fungsi class utama untuk NavLink
const getMenuClass = ({ isActive }) =>
  `my-[3px] flex cursor-pointer items-center px-8 gap-4 relative text-[15px] transition-all duration-200 ${
    isActive
      ? "font-bold text-blue-600 after:content-[''] after:absolute after:right-0 after:top-px after:h-6 after:w-1 after:rounded-lg after:bg-blue-600 "
      : "text-gray-600 hover:font-bold hover:text-blue-600   "
  }`;


// Komponen utama
export default function SidebarLinks() {
  return (
    <div id="sidebar-menu">
      <ul id="menu-list" className="space-y-2">
        <li>
          <NavLink to="/" className={getMenuClass}>
            <MdHome className="h-5 w-5" />
            <p>Main Dashboard</p>
          </NavLink>
        </li>

        <li>
          <NavLink id= "menu-1" to="/Admin/" className={getMenuClass}>
            <MdOutlineShoppingCart className="h-5 w-5" />
            <p>NFT Marketplace</p>
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-2" to="/listpostingan" className={getMenuClass}>
            <MdBarChart className="h-5 w-5" />
            <p>Daftar Postingan</p>
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-3" to="/listuser" className={getMenuClass}>
            <MdPerson className="h-5 w-5" />
            <p>Daftar Pengguna</p>
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-4" to="/auth/sign-in" className={getMenuClass}>
            <MdLock className="h-5 w-5" />
            <p>Sign In</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
