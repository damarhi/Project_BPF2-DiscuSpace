import { BsDatabaseExclamation } from "react-icons/bs"; 

export default function EmptyState({ text = "Belum ada data" }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[200px] text-gray-500 text-center">
      <div className="text-4xl mb-2">
        <BsDatabaseExclamation />
      </div>
      <p>{text}</p>
    </div>
  );
}
