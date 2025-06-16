import React from "react";

export default function Widget({ icon, title, subtitle }) {
  return (
    <div className="w-full bg-white rounded-4xl shadow-md p-4 min-h-[100px] flex items-center space-x-4 dark:bg-gray-800">
      {/* Icon */}
      <div className="bg-[#F5F8FE] dark:bg-gray-700 p-3 rounded-full">
        <span className="text-2xl text-blue-500 dark:text-white">{icon}</span>
      </div>
      {/* Info */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-800 dark:text-white">{subtitle}</span>
        <span className="text-base text-gray-500 dark:text-gray-300">{title}</span>
      </div>
    </div>
  );
}
