import React from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import PageHeader from "./PageHeader";

export default function Header({ onOpenSidenav, brandText, title }) {


  return (
    <nav className="sticky top-4 z-40 flex flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      {/* LEFT */}

      <PageHeader brandText={brandText} title={title} />


      {/* RIGHT */}
      <div className="relative mt-1 flex h-[61px] w-[355px] items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-md dark:bg-gray-800 md:w-[365px] xl:w-[365px]">
        {/* Search Bar */}
        <div className="flex h-full items-center rounded-full bg-[#F5F8FE] text-gray-800 dark:bg-gray-700 dark:text-white xl:w-[225px]">
          <span className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full rounded-full bg-[#F5F8FE] text-sm font-medium text-gray-800 placeholder:bg-[#F5F8FE] outline-none dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
          />
        </div>

        {/* Burger Button */}
        <label className="btn btn-circle swap swap-rotate xl:hidden">
          {/* Controlled checkbox for toggling */}
          <input
            type="checkbox"
            onChange={onOpenSidenav} // fungsi toggle dari props
            className="hidden"
          />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>


        {/* Dark Mode Toggle */}

        {/* Avatar */}
        <img
          className="h-10 w-10 rounded-full"
          src={null}
          alt="Avatar"
        />
      </div>
    </nav>
  );
}
