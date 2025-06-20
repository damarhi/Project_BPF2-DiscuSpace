import { useEffect, useState } from "react";
import { laporanAPI } from "../../../Services/laporanAPI";
import { userAPI } from "../../../Services/userAPI";
import Pagination from "../../../components/pagination";

export default function ModalPengguna({ open, onClose, id_terlapor, nama_terlapor }) {
    const [laporanList, setLaporanList] = useState([]);

    useEffect(() => {
        const fetchLaporan = async () => {
            if (!id_terlapor) return;

            try {
                const [laporanData, usersData] = await Promise.all([
                    laporanAPI.fetchLaporan(),
                    userAPI.fetchUser(),
                ]);

                const filtered = laporanData
                    .filter((lap) => lap.id_terlapor === id_terlapor)
                    .map((lap) => ({
                        ...lap,
                        pelapor: usersData.find((u) => u.id_user === lap.id_pelapor) || {},
                    }));

                setLaporanList(filtered);
            } catch (err) {
                console.error("Gagal memuat detail laporan:", err);
            }
        };

        if (open) fetchLaporan();
    }, [open, id_terlapor]);

    if (!open) return null;

    return (
        <dialog open className="modal">
            <div className="modal-box max-w-3xl">
                <form method="dialog">
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>

                <h3 className="font-bold text-lg mb-1">
                    Pengguna yang melaporkan: <span className="text-blue-600">{nama_terlapor}</span>
                </h3>

                {laporanList.length === 0 ? (
                    <p className="text-sm text-gray-500 mt-4">Belum ada laporan untuk pengguna ini.</p>
                ) : (
                    <Pagination
                        data={laporanList}
                        itemsPerPage={10}
                        render={(currentItems) => (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {currentItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-4 px-4 py-2 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 transition"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover mt-1"
                                            src={
                                                item.pelapor?.profile?.startsWith("data:image")
                                                    ? item.pelapor.profile
                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.pelapor.nama || "Pelapor")}&background=eee&color=555`
                                            }
                                            alt={item.pelapor.nama}
                                        />
                                        <div className="text-sm flex-1">
                                            <div className="font-semibold text-gray-800">{item.pelapor.nama} <span className="text-xs text-gray-500 mb-1"> / @{item.pelapor.username}</span></div>
                                            <div className="text-gray-700 whitespace-pre-line">
                                                {item.deskripsi || "Tanpa deskripsi"}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                )}
            </div>
        </dialog>
    );
}
