/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdHome,
  MdSpaceDashboard,
  MdError,
  MdPerson,
  MdLock,
} from "react-icons/md";

// Fungsi class utama untuk NavLink
const getMenuClass = ({ isActive }) =>
  `my-[3px] flex cursor-pointer items-center px-8 gap-4 relative text-[15px] transition-all duration-200 ${
    isActive
      ? "font-bold text-blue-600 after:content-[''] after:absolute after:right-0 after:top-px after:h-6 after:w-1 after:rounded-lg after:bg-blue-600"
      : "text-gray-600 hover:font-bold hover:text-blue-600"
  }`;

export default function SidebarLinks() {
  const location = useLocation();

  // Cek apakah path sekarang berada di dalam kategori laporan
  const isLaporanActive = location.pathname.startsWith("/laporan");

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
          <NavLink to="/listpostingan" className={getMenuClass}>
            <MdSpaceDashboard className="h-5 w-5" />
            <p>Daftar Postingan</p>
          </NavLink>
        </li>

        {/* Dropdown Inline */}
        <li className="group relative">
          <div
            className={`my-[3px] flex items-center px-8 gap-4 text-[15px] cursor-pointer relative transition-all duration-200 ${
              isLaporanActive
                ? "font-bold text-blue-600 after:content-[''] after:absolute after:right-0 after:top-px after:h-6 after:w-1 after:rounded-lg after:bg-blue-600"
                : "text-gray-600 hover:font-bold hover:text-blue-600"
            }`}
          >
            <MdError className="h-5 w-5" />
            <p>Laporan Keluhan</p>
          </div>

          {/* Submenu tampil saat hover */}
          <ul className="pl-[58px] mt-1 hidden group-hover:block space-y-1">
            <li>
              <NavLink
                to="/laporan/user"
                className={({ isActive }) =>
                  `flex items-center text-sm ${
                    isActive
                      ? "font-bold text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                <span>•</span>
                <span className="ml-2">Pengguna</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/laporan/postingan"
                className={({ isActive }) =>
                  `flex items-center text-sm ${
                    isActive
                      ? "font-bold text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                <span>•</span>
                <span className="ml-2">Postingan</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/laporan/komentar"
                className={({ isActive }) =>
                  `flex items-center text-sm ${
                    isActive
                      ? "font-bold text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                <span>•</span>
                <span className="ml-2">Komentar</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink to="/listuser" className={getMenuClass}>
            <MdPerson className="h-5 w-5" />
            <p>Daftar Pengguna</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/auth/sign-in" className={getMenuClass}>
            <MdLock className="h-5 w-5" />
            <p>Sign In</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
