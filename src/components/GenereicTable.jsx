export default function GenericTable({ columns, data, renderRow }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[800px] w-full text-gray-800 bg-white text-base font-semibold">
        <thead>
          <tr className=" text-gray-400 uppercase">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="p-4 text-left whitespace-nowrap border-b border-gray-400"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.user_id || `${index}-${item.email || "no-id"}`}
              className="border-b border-blue-100 hover:bg-blue-50 transition duration-150"
            >
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
