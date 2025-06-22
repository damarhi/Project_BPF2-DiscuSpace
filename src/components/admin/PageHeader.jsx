import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ brandText, title, brandLink }) {
  return (
    <div className="flex flex-col">

      <div className="flex items-center space-x-1 text-sm text-gray-800">
        <Link to="/" className="hover:underline text-[12px]">Dashboard</Link>
        <span>/</span>
        <span className="capitalize text-[12px]"><Link to={brandLink} className="hover:underline text-[12px]">{brandText}</Link></span>
      </div>


      <h1 className="text-[30px] font-bold capitalize text-gray-800">
        {title}
      </h1>
    </div>
  );
}
