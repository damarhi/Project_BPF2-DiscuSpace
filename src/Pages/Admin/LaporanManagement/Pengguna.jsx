import { useEffect, useState } from "react";
import { FiTrash2, FiEye } from "react-icons/fi";
import { userAPI } from "../../../Services/userAPI";
import { laporanAPI } from "../../../Services/laporanAPI";
import Header from "../../../components/admin/Header";
import GenericTable from "../../../components/GenereicTable";
import AlertBox from "../../../components/AlertBox";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ModalPengguna from "./ModalPengguna";
import EmptyState from "../../../components/EmptyState";

export default function Pengguna() {
    const [laporan, setLaporan] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedTerlapor, setSelectedTerlapor] = useState(null);



    useEffect(() => {
        loadLaporan();
    }, []);

    const loadLaporan = async () => {
        try {
            setLoading(true);
            const [laporanData, userData] = await Promise.all([
                laporanAPI.fetchLaporan(),
                userAPI.fetchUser(),
            ]);

            setLaporan(laporanData);
            setUsers(userData);
        } catch (err) {
            setError("Gagal memuat data laporan.");
        } finally {
            setLoading(false);
        }
    };

    const groupedLaporan = Object.values(
        laporan.reduce((acc, curr) => {
            const key = curr.id_terlapor;
            if (!acc[key]) {
                acc[key] = { id_terlapor: curr.id_terlapor, jumlah: 0, laporan: [] };
            }
            acc[key].jumlah += 1;
            acc[key].laporan.push(curr);
            return acc;
        }, {})
    );

    const filteredLaporan = groupedLaporan.filter((item) => {
        const terlapor = users.find((u) => u.id_user === item.id_terlapor);
        return (
            terlapor?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            terlapor?.nama?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleDeleteByTerlapor = async (id_terlapor) => {
        const konfirmasi = confirm("Hapus semua laporan dan nonaktifkan pengguna ini?");
        if (!konfirmasi) return;
        try {
            setLoading(true);

            // Hapus semua laporan terkait user
            const toDelete = laporan.filter((lap) => lap.id_terlapor === id_terlapor);
            await Promise.all(toDelete.map((lap) => laporanAPI.deleteLaporan(lap.id_laporan)));

            // Update status user menjadi nonaktif (soft delete)
            await userAPI.updateUser(id_terlapor, { status: "nonaktif" });

            setSuccess("Laporan berhasil dihapus dan pengguna dinonaktifkan.");
            loadLaporan();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Gagal menghapus laporan atau menonaktifkan pengguna.");
        } finally {
            setLoading(false);
        }
    };


    const handleOpenDetailModal = (id_terlapor) => {
        const user = users.find((u) => u.id_user === id_terlapor);
        setSelectedTerlapor({ id_terlapor, nama: user?.nama || "Tanpa Nama" });
        setShowDetailModal(true);
    };


    return (
        <div className="mt-4">
            <Header
                brandText="Laporan Keluhan"
                brandLink="/laporan/user"
                title="Laporan Pengguna"
            />
            <div className="p-3 bg-[#f4f7fe] min-h-screen">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-3">
                        <h2 className="text-lg font-semibold text-gray-800">Terlapor & Jumlah Laporan</h2>
                        <input
                            type="text"
                            placeholder="Cari terlapor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-60 px-3 py-1.5 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {error && <AlertBox type="error">{error}</AlertBox>}
                    {success && <AlertBox type="success">{success}</AlertBox>}

                    {loading ? (
                        <div className="flex justify-center items-center h-[180px]">
                            <LoadingSpinner text="Memuat data laporan..." />
                        </div>
                    ) : filteredLaporan.length === 0 ? (
                         <div className="min-w-[900px] overflow-x-auto">
                        <EmptyState
                            text="Tidak ada Pengguna yang Dilaporan"
                           
                        />
                        </div>
                    ) : (
                        <Pagination
                            data={filteredLaporan}
                            itemsPerPage={10}
                            render={(currentItems, indexOfFirstItem) => (
                                <div className="min-w-[900px] overflow-x-auto">
                                    <GenericTable
                                        columns={["NO", "TERLAPOR", "JUMLAH YANG MELAPOR", "AKSI"]}
                                        data={currentItems}
                                        renderRow={(item, index) => {
                                            const terlapor = users.find((u) => u.id_user === item.id_terlapor);
                                            return [
                                                <td key="no" className="p-3 text-sm font-semibold">{indexOfFirstItem + index + 1}</td>,
                                                <td key="terlapor" className="p-3 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <img
                                                            src={
                                                                terlapor?.profile?.startsWith("data:image")
                                                                    ? terlapor.profile
                                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(terlapor?.nama || "User")}&background=eee&color=555`
                                                            }
                                                            alt="Terlapor"
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                         <div className="font-semibold text-gray-800">{terlapor?.nama} <span className="text-xs text-gray-500 mb-1"> / @{terlapor?.username}</span></div>
                                                 
                                                    </div>
                                                </td>,
                                                <td key="jumlah" className="p-3 text-sm ">{item.jumlah}</td>,
                                                <td key="aksi" className="p-3">
                                                    <div className="flex space-x-3 text-gray-600">
                                                        <button
                                                            className="hover:text-blue-600"
                                                            title="Lihat detail laporan"
                                                            onClick={() => handleOpenDetailModal(item.id_terlapor)}
                                                        >
                                                            <FiEye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteByTerlapor(item.id_terlapor)}
                                                            title="Hapus semua laporan"
                                                            className="hover:text-red-600"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            ];
                                        }}
                                    />
                                </div>
                            )}
                        />
                    )}

                </div>
            </div>

            <ModalPengguna
                open={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                id_terlapor={selectedTerlapor?.id_terlapor}
                nama_terlapor={selectedTerlapor?.nama}
            />

        </div>
    );
}
