import { useEffect, useState } from "react";
import { laporanAPI } from "../../../Services/laporanAPI";
import { userAPI } from "../../../Services/userAPI";
import Pagination from "../../../components/pagination";

export default function ModalKomentar({ open, onClose, komentarObj, users }) {
    const [laporanList, setLaporanList] = useState([]);

    useEffect(() => {
        const fetchLaporanKomentar = async () => {
            if (!komentarObj?.id_komentar) return;

            try {
                const laporanData = await laporanAPI.fetchLaporan();
                const filtered = laporanData
                    .filter((lap) => lap.id_komentar === komentarObj.id_komentar)
                    .map((lap) => ({
                        ...lap,
                        pelapor: users.find((u) => u.id_user === lap.id_pelapor) || {},
                    }));

                setLaporanList(filtered);
            } catch (err) {
                console.error("Gagal memuat laporan komentar:", err);
            }
        };

        if (open) fetchLaporanKomentar();
    }, [open, komentarObj, users]);

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
                    Komentar yang Dilaporkan:
                </h3>
                <div className="text-gray-800 bg-gray-100 p-3 rounded-md text-sm mb-4 whitespace-pre-line">
                    {komentarObj?.isi_komentar || "Komentar tidak ditemukan"}
                </div>

                {laporanList.length === 0 ? (
                    <p className="text-sm text-gray-500 mt-4">
                        Tidak ada pengguna yang melaporkan komentar ini.
                    </p>
                ) : (
                    <Pagination
                        data={laporanList}
                        itemsPerPage={10}
                        render={(currentItems) => (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
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
                                            <div className="font-semibold text-gray-800">
                                                {item.pelapor.nama}{" "}
                                                <span className="text-xs text-gray-500"> / @{item.pelapor.username}</span>
                                            </div>
                                            <div className="text-gray-700 whitespace-pre-line mt-1">
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
