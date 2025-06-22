import React, { useEffect, useState } from "react";

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
  const brandPrimaryColor = isAtTop ? "text-white" : "text-blue-600";
  const brandSecondaryColor = isAtTop ? "text-white/70" : "text-blue-400";

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

        {/* Logo & Brand */}
        <img src="/src/assets/Image/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
        <div className={`text-2xl font-bold uppercase ${brandPrimaryColor}`}>
          Discu <span className={`font-semibold normal-case ${brandSecondaryColor}`}>SPACE</span>
        </div>
      </div>

      {/* KANAN: Menu + Login */}
      <div className="navbar-end flex items-center gap-x-6">
        {/* Menu Desktop */}
        <ul className={`hidden lg:flex menu menu-horizontal text-lg font-semibold ${menuTextColor}`}>
          <li><a>Home</a></li>
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

        {/* Tombol Login */}
        <a className={`btn btn-md border-0 rounded-md font-semibold text-base ${loginBtnClass}`}>
          GET STARTED
        </a>
      </div>
    </div>
  );
}
