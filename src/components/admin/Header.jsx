import React, { useEffect, useRef, useState } from "react";
import { FiAlignJustify, FiSearch, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini
import PageHeader from "./PageHeader";
import { supabase } from "../../config/supabase";

export default function Header({ onOpenSidenav, brandText, title }) {
  const [authUser, setAuthUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate(); // ✅ Untuk redirect

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser?.email) {
      setAuthUser(storedUser); // Simpan info user dasar

      // Ambil data dari tabel user berdasarkan email
      supabase
        .from("user")
        .select("nama, username, profile")
        .eq("email", storedUser.email)
        .single()
        .then(({ data, error }) => {
          if (!error) setProfileData(data);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };


  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const profileImage =
    profileData?.profile?.startsWith("data:image") || profileData?.profile?.startsWith("http")
      ? profileData.profile
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profileData?.nama || "Admin DiscuSpace"
      )}&background=eee&color=555`;

  return (
    <nav className="sticky top-0 z-40 flex flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl">
      <PageHeader brandText={brandText} title={title} />

      <div className="relative mt-1 flex h-[40px] w-fit items-center justify-around gap-3 rounded-full bg-white px-3 py-1 shadow-md">
        <div className="flex h-full items-center rounded-full bg-[#F5F8FE] text-gray-80 w-[180px]">
          <span className="pl-3 pr-2 text-base">
            <FiSearch className="h-3.5 w-3.5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full rounded-full bg-[#F5F8FE] text-xs font-medium text-gray-800 placeholder:text-gray-400 outline-none"
          />
        </div>

        <label className="swap swap-rotate xl:hidden">
          <input type="checkbox" onChange={onOpenSidenav} className="hidden" />
        </label>

        {profileData?.nama && (
          <span className="text-sm font-semibold text-gray-700 hidden md:block">
            {profileData.nama}
          </span>
        )}

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={profileImage}
            alt={profileData?.nama || "User"}
            className="w-9 h-9 rounded-full object-cover cursor-pointer border border-gray-300"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/10 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 text-gray-800">
                <p className="text-base font-semibold">
                 Hai Admin 👋 
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 font-medium hover:bg-red-50 transition-all duration-150"
              >
                <FiLogOut className="text-md" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
