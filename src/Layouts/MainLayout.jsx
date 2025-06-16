import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import "../assets/tailwind.css";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle: buka jika tertutup, tutup jika terbuka
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div id="app-container" className="bg-[#F5F8FE] dark:!bg-navy-900 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row w-full">
        {/* Sidebar */}
        <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <div id="main-content" className="flex flex-1 flex-col p-4 xl:ml-75">
          {/* Kirim toggleSidebar ke anak lewat context */}
          <Outlet context={{ onOpenSidenav: toggleSidebar }} />
        </div>
      </div>
    </div>
  );
}
