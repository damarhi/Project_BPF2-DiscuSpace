export default function Widget({ icon, title, subtitle }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-3 min-h-[80] h-[90] flex items-center space-x-3">

      <div className="bg-[#F5F8FE] p-2 rounded-full flex items-center justify-center h-12 w-8">
        <span className="text-lg text-blue-500">{icon}</span>
      </div>

      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-gray-800 ">{subtitle}</span>
        <span className="text-xs text-gray-500">{title}</span>
      </div>
    </div>
  );
}
