import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import "../assets/tailwind.css";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      id="app-container"
      className="bg-[#F5F8FE] min-h-screen flex overflow-x-hidden"
    >
      <div id="layout-wrapper" className="flex flex-row w-full">
        <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div
          id="main-content"
          className="flex flex-1 flex-col p-4 mt-[-30px] xl:ml-64"
        >
          {/* Wrap content with max width and center horizontally */}
          <div className="flex flex-col lg:flex-row gap-4 w-full h-full min-h-0 max-w-screen-xl mx-auto">
            <Outlet context={{ onOpenSidenav: toggleSidebar }} />
          </div>
        </div>
      </div>
    </div>
  );
}
