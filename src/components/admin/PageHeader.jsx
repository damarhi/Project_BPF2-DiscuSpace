import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ brandText, title, brandLink }) {
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-1 text-sm text-gray-800 dark:text-white">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <span>/</span>
        <span className="capitalize"><Link to={brandLink} className="hover:underline">{brandText}</Link></span>
      </div>

      {/* Title */}
      <h1 className="text-[33px] font-bold capitalize text-gray-800 dark:text-white">
        {title}
      </h1>
    </div>
  );
}
