import { useEffect, useState } from "react";
import { FiTrash2, FiEye } from "react-icons/fi";
import { userAPI } from "../../../Services/userAPI";
import { laporanAPI } from "../../../Services/laporanAPI";
import { komentarAPI } from "../../../Services/komentarAPI";
import Header from "../../../components/admin/Header";
import GenericTable from "../../../components/GenereicTable";
import AlertBox from "../../../components/AlertBox";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ModalKomentar from "./ModalKomentar";
import EmptyState from "../../../components/EmptyState";

export default function Komentar() {
    const [laporan, setLaporan] = useState([]);
    const [komentar, setKomentar] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedKomentar, setSelectedKomentar] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [laporanData, komentarData, userData] = await Promise.all([
                laporanAPI.fetchLaporan(),
                komentarAPI.fetchKomentar(),
                userAPI.fetchUser(),
            ]);
            setLaporan(laporanData);
            setKomentar(komentarData);
            setUsers(userData);
        } catch (err) {
            setError("Gagal memuat data laporan komentar.");
        } finally {
            setLoading(false);
        }
    };

    const grouped = Object.values(
        laporan.reduce((acc, curr) => {
            const key = curr.id_komentar;
            if (!key) return acc;
            if (!acc[key]) {
                acc[key] = { id_komentar: key, jumlah: 0, laporan: [] };
            }
            acc[key].jumlah += 1;
            acc[key].laporan.push(curr);
            return acc;
        }, {})
    );

    const handleDeleteKomentar = async (id_komentar) => {
        const konfirmasi = confirm("Hapus komentar ini beserta semua laporan yang terkait?");
        if (!konfirmasi) return;
        try {
            setLoading(true);

            // Hapus semua laporan terkait komentar ini
            const toDelete = laporan.filter((l) => l.id_komentar === id_komentar);
            await Promise.all(toDelete.map((l) => laporanAPI.deleteLaporan(l.id_laporan)));

            // Hapus komentar dari tabel komentar
            await komentarAPI.deleteKomentar(id_komentar);

            setSuccess("Komentar dan semua laporan berhasil dihapus.");
            loadData();
        } catch (err) {
            setError("Gagal menghapus komentar atau laporan.");
        } finally {
            setLoading(false);
        }
    };


    const handleOpenDetailModal = (komentarObj) => {
        setSelectedKomentar(komentarObj);
        setShowModal(true);
    };

    return (
        <div className="mt-4">
            <Header brandText="Laporan Keluhan" title="Laporan Komentar" brandLink="/laporan/komentar" />
            <div className="p-3 bg-[#f4f7fe] min-h-screen">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    {error && <AlertBox type="error">{error}</AlertBox>}
                    {success && <AlertBox type="success">{success}</AlertBox>}

                    {loading ? (
                        <LoadingSpinner text="Memuat data laporan komentar..." />
                    ) : grouped.length === 0 ? (
                        <div className="min-w-[900px] overflow-x-auto">
                            <EmptyState text="Tidak ada laporan komentar yang ditemukan." />
                        </div>
                    ) : (
                        <Pagination
                            data={grouped}
                            itemsPerPage={10}
                            render={(currentItems, indexOfFirstItem) => (
                                <div className="min-w-[900px] overflow-x-auto">
                                    <GenericTable
                                        columns={["NO", "USERNAME", "KOMENTAR", "JUMLAH LAPORAN", "AKSI"]}
                                        data={currentItems}
                                        renderRow={(item, index) => {
                                            const kom = komentar.find((k) => k.id_komentar === item.id_komentar);
                                            const pemilik = users.find((u) => u.id_user === kom?.id_user);
                                            return [
                                                <td key="no" className="p-3 text-sm font-semibold">
                                                    {indexOfFirstItem + index + 1}
                                                </td>,
                                                <td key="username" className="p-3 text-sm whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <img
                                                            src={
                                                                pemilik?.profile?.startsWith("data:image")
                                                                    ? pemilik.profile
                                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(pemilik?.nama || "User")}&background=eee&color=555`
                                                            }
                                                            alt="User Profile"
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                        <span className="text-gray-800 font-medium">@{pemilik?.username || "-"}</span>
                                                    </div>
                                                </td>,
                                                <td key="komentar" className="p-3 text-sm text-gray-700 whitespace-pre-wrap">
                                                    {kom?.isi_komentar || "-"}
                                                </td>,
                                                <td key="jumlah" className="p-3 text-sm text-center">{item.jumlah}</td>,
                                                <td key="aksi" className="p-3 whitespace-nowrap">
                                                    <div className="flex space-x-3 text-gray-600">
                                                        <button
                                                            title="Lihat detail laporan"
                                                            onClick={() => handleOpenDetailModal({ ...kom, laporan: item.laporan })}
                                                            className="hover:text-blue-600"
                                                        >
                                                            <FiEye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteKomentar(item.id_komentar)}
                                                            title="Hapus semua laporan"
                                                            className="hover:text-red-600"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>,
                                            ];
                                        }}
                                    />

                                </div>
                            )}
                        />
                    )}
                </div>
            </div>

            <ModalKomentar
                open={showModal}
                onClose={() => setShowModal(false)}
                komentarObj={selectedKomentar}
                users={users}
            />
        </div>
    );
}
