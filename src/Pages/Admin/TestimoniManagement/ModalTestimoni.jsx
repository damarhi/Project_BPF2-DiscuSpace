import { useEffect, useState } from "react";

export default function ModalTestimoni({ open, onClose, testimoni, user }) {
  if (!open || !testimoni || !user) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Detail Testimoni Pengguna</h3>

        {/* Baris Profil */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={
              user?.profile?.startsWith("data:image")
                ? user.profile
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.nama || "User"
                  )}&background=eee&color=555`
            }
            alt={user?.nama}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-800 text-base">{user?.nama}</div>
            <div className="text-sm text-gray-500">@{user?.username}</div>
          </div>
        </div>

        {/* Baris Isi Testimoni */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Isi Testimoni:</h4>
          <div className="bg-gray-100 text-gray-800 p-3 rounded-md text-sm whitespace-pre-line">
            {testimoni?.isi_testimoni || "Tidak ada isi testimoni."}
          </div>
        </div>

        {/* Baris Rating */}
        <div className="mb-1">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Rating:</h4>
          <div className="text-blue-500 text-xl font-semibold">
            {"★".repeat(testimoni.rating)}{" "}
            <span className="text-gray-300">
              {"☆".repeat(5 - testimoni.rating)}
            </span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
