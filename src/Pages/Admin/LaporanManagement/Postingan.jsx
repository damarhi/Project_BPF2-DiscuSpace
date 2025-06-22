import { useEffect, useState } from "react";
import { FiTrash2, FiEye } from "react-icons/fi";
import { userAPI } from "../../../Services/userAPI";
import { laporanAPI } from "../../../Services/laporanAPI";
import { postinganAPI } from "../../../Services/postinganAPI";
import Header from "../../../components/admin/Header";
import GenericTable from "../../../components/GenereicTable";
import AlertBox from "../../../components/AlertBox";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EmptyState from "../../../components/EmptyState";
import ModalPostingan from "./ModalPostingan";

export default function Postingan() {
    const [laporan, setLaporan] = useState([]);
    const [users, setUsers] = useState([]);
    const [postingan, setPostingan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedPostingan, setSelectedPostingan] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [laporanData, userData, postinganData] = await Promise.all([
                laporanAPI.fetchLaporan(),
                userAPI.fetchUser(),
                postinganAPI.fetchPostingan(),
            ]);
            setLaporan(laporanData);
            setUsers(userData);
            setPostingan(postinganData);
        } catch {
            setError("Gagal memuat data.");
        } finally {
            setLoading(false);
        }
    };

    const groupedPostingan = Object.values(
        laporan.reduce((acc, curr) => {
            if (!curr.id_postingan) return acc;
            const key = curr.id_postingan;
            if (!acc[key]) {
                acc[key] = { id_postingan: key, jumlah: 0, laporan: [] };
            }
            acc[key].jumlah += 1;
            acc[key].laporan.push(curr);
            return acc;
        }, {})
    );

    const handleDelete = async (id_postingan) => {
        const konfirmasi = confirm("Hapus semua laporan dan postingan ini?");
        if (!konfirmasi) return;
        try {
            setLoading(true);
            const related = laporan.filter((lap) => lap.id_postingan === id_postingan);
            await Promise.all(related.map((lap) => laporanAPI.deleteLaporan(lap.id_laporan)));
            await postinganAPI.deletePostingan(id_postingan);
            setSuccess("Postingan dan laporannya berhasil dihapus.");
            loadData();
        } catch {
            setError("Gagal menghapus data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <Header brandText="Laporan Postingan" title="Postingan yang Dilaporkan" />
            <div className="p-3 bg-[#f4f7fe] min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">

                    <div className="lg:col-span-3 w-full rounded-xl bg-white p-4 shadow-sm h-fit">
                        <h2 className="text-lg font-semibold text-gray-800">Preview Postingan</h2>
                        {selectedPostingan ? (
                            <div className="mt-3">
                                <h3 className="text-base font-semibold text-gray-800">{selectedPostingan.judul}</h3>
                                {selectedPostingan.gambar && (
                                    <img
                                        src={selectedPostingan.gambar}
                                        alt="Gambar Postingan"
                                        className="max-h-[200px] w-auto object-contain rounded-md mt-2"
                                    />
                                )}
                                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                                    {selectedPostingan.deskripsi}
                                </p>
                            </div>
                        ) : (
                            <EmptyState text="Pilih postingan untuk melihat detail." />
                        )}
                    </div>

                    <div className="lg:col-span-7 w-full rounded-xl bg-white p-4 shadow-sm overflow-auto">
                        {error && <AlertBox type="error">{error}</AlertBox>}
                        {success && <AlertBox type="success">{success}</AlertBox>}

                        {loading ? (
                            <div className="flex justify-center items-center h-[180px]">
                                <LoadingSpinner text="Memuat data laporan..." />
                            </div>
                        ) : groupedPostingan.length === 0 ? (
                            <EmptyState text="Tidak ada postingan yang dilaporkan." />
                        ) : (
                            <Pagination
                                data={groupedPostingan}
                                itemsPerPage={10}
                                render={(currentItems, indexOfFirstItem) => (
                                    <div className="min-w-[900px] overflow-x-auto">
                                        <GenericTable
                                            columns={["NO", "DIPOSTING OLEH", "JUDUL POSTINGAN", "JUMLAH LAPORAN", "AKSI"]}
                                            data={currentItems}
                                            renderRow={(item, index) => {
                                                const post = postingan.find((p) => p.id_postingan === item.id_postingan);
                                                const user = users.find((u) => u.id_user === post?.id_user);
                                                return [
                                                    <td key="no" className="p-3 text-sm font-semibold">{indexOfFirstItem + index + 1}</td>,
                                                    <td key="user" className="p-3 text-sm">
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={user?.profile?.startsWith("data:image")
                                                                    ? user.profile
                                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nama || "User")}&background=eee&color=555`}
                                                                alt="user"
                                                                className="w-8 h-8 rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <div className="font-semibold text-gray-800">{user?.nama}</div>
                                                                <div className="text-xs text-gray-500">@{user?.username}</div>
                                                            </div>
                                                        </div>
                                                    </td>,
                                                    <td
                                                        key="judul"
                                                        className="p-3 text-sm text-blue-600 hover:underline cursor-pointer"
                                                        onClick={() => setSelectedPostingan(post)}
                                                    >
                                                        {post?.judul || "-"}
                                                    </td>,
                                                    <td key="jumlah" className="p-3 text-sm">{item.jumlah}</td>,
                                                    <td key="aksi" className="p-3 text-sm">
                                                        <div className="flex space-x-3 text-gray-600">
                                                            <button
                                                                title="Lihat detail laporan"
                                                                onClick={() => {
                                                                    setSelectedPostingan(post);
                                                                    setShowDetailModal(true);
                                                                }}
                                                                className="hover:text-blue-600"
                                                            >
                                                                <FiEye className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id_postingan)}
                                                                title="Hapus"
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
            </div>
            <ModalPostingan
                open={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                id_postingan={selectedPostingan?.id_postingan}
                judul_postingan={selectedPostingan?.judul}
            />

        </div>
    );
}
