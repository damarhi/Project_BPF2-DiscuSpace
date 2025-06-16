import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { postinganAPI } from "../../../Services/postinganAPI";
import { userAPI } from "../../../Services/userAPI";
import Header from "../../../components/admin/Header";
import GenericTable from "../../../components/GenereicTable";
import AlertBox from "../../../components/AlertBox";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EmptyState from "../../../components/EmptyState";
import EditPostingan from "./EditPostingan";
import { motion, AnimatePresence } from "framer-motion";

export default function ListPostingan() {
    const [postingan, setPostingan] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedPostingan, setSelectedPostingan] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { onOpenSidenav } = useOutletContext();

    useEffect(() => {
        loadPostingan();
    }, []);

    const loadPostingan = async () => {
        try {
            setLoading(true);
            setError("");
            const [postinganData, usersData] = await Promise.all([
                postinganAPI.fetchPostingan(),
                userAPI.fetchUser(),
            ]);
            const mergedData = postinganData.map((post) => ({
                ...post,
                user: usersData.find((u) => u.id_user === post.id_user) || {},
            }));
            setPostingan(mergedData);
        } catch (err) {
            setError("Gagal memuat data postingan.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id_postingan) => {
        const konfirmasi = confirm("Yakin ingin menghapus postingan ini?");
        if (!konfirmasi) return;
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            await postinganAPI.deletePostingan(id_postingan);
            await loadPostingan();
            setSuccess("Data postingan berhasil dihapus.");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const filteredPostingan = postingan.filter(
        (item) =>
            item.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Kategori?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openEditModal = (item) => {
        setSelectedPostingan(item);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const handleSavePostingan = async (id_postingan, updatedData) => {
        try {
            setLoading(true);
            await postinganAPI.updatePostingan(id_postingan, updatedData);
            setSuccess("Postingan berhasil diperbarui.");
            loadPostingan();
            closeEditModal();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Gagal memperbarui data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6">
            <Header
                brandText="Daftar Postingan"
                brandLink="/listpostingan"
                title="Daftar Postingan"
                onOpenSidenav={onOpenSidenav}
            />
            <div className="p-6 bg-[#f4f7fe] min-h-screen">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* KIRI - DETAIL POSTINGAN */}
                    <div className="lg:w-1/3 w-full rounded-2xl bg-white p-6 shadow-md min-h-[300px]">
                        <h2 className="text-xl font-bold text-gray-800">Preview Postingan</h2>
                        <div className="relative mb-90">
                            <AnimatePresence mode="wait">
                                {selectedPostingan ? (
                                    <motion.div
                                        key={selectedPostingan.id_postingan}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col items-start space-y-4 mt-4" // <== Tambahkan mt-4 di sini
                                    >
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {selectedPostingan.judul}
                                        </h3>
                                        {selectedPostingan.gambar && (
                                            <img
                                                src={selectedPostingan.gambar}
                                                alt="Gambar Postingan"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        )}

                                        <p className="text-gray-600">{selectedPostingan.deskripsi}</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4" // <== Agar teks EmptyState juga punya jarak
                                    >
                                        <EmptyState text="Pilih postingan untuk melihat detail." />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>



                    {/* KANAN - TABEL POSTINGAN */}
                    <div className="lg:w-2/3 w-full rounded-2xl bg-white p-6 shadow-md overflow-auto">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Tabel Postingan
                            </h2>
                            <div className="relative w-72">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FiSearch />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari postingan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {error && <AlertBox type="error">{error}</AlertBox>}
                        {success && <AlertBox type="success">{success}</AlertBox>}

                        {loading && (
                            <div className="flex justify-center items-center h-[200px]">
                                <LoadingSpinner text="Memuat data postingan..." />
                            </div>
                        )}

                        {!loading && filteredPostingan.length === 0 && (
                            <EmptyState text="Tidak ada postingan ditemukan." />
                        )}

                        {!loading && filteredPostingan.length > 0 && (
                            <Pagination
                                data={filteredPostingan}
                                itemsPerPage={10}
                                render={(currentItems, indexOfFirstItem) => (
                                    <GenericTable
                                        columns={[
                                            "NO",
                                            "PENGGUNA",
                                            "JUDUL",
                                            "KATEGORI",
                                            "TANGGAL POSTING",
                                            "AKSI",
                                        ]}
                                        data={currentItems}
                                        renderRow={(item, index) => [
                                            <td key="no" className="p-4 font-semibold text-left">
                                                {indexOfFirstItem + index + 1}
                                            </td>,
                                            <td key="user" className="p-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={
                                                            item.user?.profile?.startsWith("data:image")
                                                                ? item.user.profile
                                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.nama || "User")}&background=eee&color=555`
                                                        }
                                                        alt={item.user?.nama}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <span className="text-gray-700 font-semibold">{item.user?.username || "-"}</span>
                                                </div>
                                            </td>,
                                            <td
                                                key="judul"
                                                className="p-4 font-medium text-gray-600 hover:underline hover:text-blue-600 cursor-pointer whitespace-nowrap"
                                                onClick={() => setSelectedPostingan(item)}
                                                title="Lihat preview"
                                            >
                                                {item.judul}
                                            </td>,
                                            <td key="kategori" className="p-4 text-gray-600 whitespace-nowrap">{item.Kategori || "-"}</td>,
                                            <td key="tanggal" className="p-4 text-gray-600 whitespace-nowrap">
                                                {new Date(item.created_at).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "2-digit"
                                                })}
                                            </td>,
                                            <td key="aksi" className="p-4 whitespace-nowrap">
                                                <div className="flex space-x-4 text-gray-500">
                                                    <button onClick={() => openEditModal(item)} title="Edit" className="hover:text-blue-600">
                                                        <FiEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id_postingan)} title="Hapus" className="hover:text-red-600" disabled={loading}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        ]}

                                    />
                                )}
                            />
                        )}

                        {showEditModal && (
                            <EditPostingan
                                item={selectedPostingan}
                                onClose={closeEditModal}
                                onSave={handleSavePostingan}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
