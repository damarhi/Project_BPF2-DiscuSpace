import React, { useEffect, useState } from "react";
import logo from "../../assets/Image/logo.png";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = isAtTop
    ? "bg-transparent"
    : "bg-white/80 backdrop-blur-md shadow-md";

  const menuTextColor = isAtTop ? "text-white" : "text-black";
  const loginBtnClass = isAtTop
    ? "bg-white/40 text-white hover:bg-white hover:text-blue-500"
    : "bg-blue-600 text-white hover:bg-blue-700";

  const brandContainerClass = `flex items-center gap-1 px-4 py-1 transition-all duration-300 ${isAtTop
    ? "bg-white rounded-full shadow-md" : ""}`;

  return (
    <div className={`sticky top-0 z-50 navbar px-6 py-4 h-20 transition-all duration-300 ${navbarClass}`}>
      {/* KIRI: Logo & Brand */}
      <div className="navbar-start flex items-center space-x-4">
        {/* Dropdown Mobile */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className={`btn btn-ghost text-xl ${menuTextColor}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-3 shadow text-lg text-black">
            <li><a className="font-semibold">Home</a></li>
            <li><a className="font-semibold">Layanan</a></li>
            <li>
              <a className="font-semibold">Tentang</a>
              <ul className="p-2">
                <li><a>Visi & Misi</a></li>
                <li><a>Tim Kami</a></li>
                <li><a>Testimoni</a></li>
              </ul>
            </li>
            <li><a className="font-semibold">Kontak</a></li>
          </ul>
        </div>

        <div className={brandContainerClass}>
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto object-contain hidden sm:block"
          />
          <div className="text-lg sm:text-xl   font-bold uppercase text-blue-600 leading-tight">
            Discu <span className="font-semibold normal-case text-blue-400">SPACE</span>
          </div>
        </div>

      </div>

      {/* KANAN: Menu + Login */}
      <div className="navbar-end flex items-center gap-x-6">
        {/* Menu Desktop */}
        <ul className={`hidden lg:flex menu menu-horizontal text-lg font-semibold ${menuTextColor}`}>
          <li><a>Home</a></li>
          <li><a>Layanan</a></li>
          <li>
            <details>
              <summary>Tentang</summary>
              <ul className="p-2 text-base text-black bg-white shadow-md">
                <li><a>Visi & Misi</a></li>
                <li><a>Tim Kami</a></li>
                <li><a>Testimoni</a></li>
              </ul>
            </details>
          </li>
          <li><a>Kontak</a></li>
        </ul>

        <a
          className={`hidden sm:inline-block px-4 py-1 text-sm md:text-base font-semibold rounded-md ${loginBtnClass}`}
        >
          GET STARTED
        </a>

      </div>
    </div>
  );
}
