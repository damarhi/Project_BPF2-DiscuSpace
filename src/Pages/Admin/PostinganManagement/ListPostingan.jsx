import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiShare2,
} from "react-icons/fi";
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
import { komentarAPI } from "../../../Services/komentarAPI";
import { likeAPI } from "../../../Services/likeAPI";
import { dibagikanAPI } from "../../../Services/dibagikanAPI";

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

      const [postinganData, usersData, komentarData, likeData, dibagikanData] = await Promise.all([
        postinganAPI.fetchPostingan(),
        userAPI.fetchUser(),
        komentarAPI.fetchKomentar(),
        likeAPI.fetchLike(),
        dibagikanAPI.fetchDibagikan(),
      ]);

      const mergedData = postinganData
        .sort((a, b) => a.id_postingan - b.id_postingan)
        .map((post) => {
          const komentarCount = komentarData.filter((k) => k.id_postingan === post.id_postingan).length;
          const likeCount = likeData.filter((l) => l.id_postingan === post.id_postingan).length;
          const shareCount = dibagikanData.filter((d) => d.id_postingan === post.id_postingan).length;

          return {
            ...post,
            user: usersData.find((u) => u.id_user === post.id_user) || {},
            komentar: komentarCount,
            like: likeCount,
            share: shareCount,
          };
        });

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
    <div className="mt-4">
      <Header
        brandText="Daftar Postingan"
        brandLink="/listpostingan"
        title="Daftar Postingan"
        onOpenSidenav={onOpenSidenav}
      />

      <div className="p-3 bg-[#f4f7fe] min-h-screen">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Container kiri */}
          <div className="w-full lg:w-[30%] rounded-xl bg-white p-4 shadow-sm h-fit">
            <h2 className="text-lg font-semibold text-gray-800">Preview Postingan</h2>
            <div className="relative mt-3">
              <AnimatePresence mode="wait">
                {selectedPostingan ? (
                  <motion.div
                    key={selectedPostingan.id_postingan}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-start space-y-3"
                  >
                    <h3 className="text-base font-semibold text-gray-800">{selectedPostingan.judul}</h3>
                    {selectedPostingan.gambar ? (
                      <img
                        src={selectedPostingan.gambar}
                        alt="Gambar Postingan"
                        className="max-h-[200px] w-auto object-contain rounded-md self-center"
                      />
                    ) : null}
                    <div className="flex space-x-4 mt-1 text-gray-600 text-sm">
                      <div className="flex items-center space-x-1">
                        <FiHeart className="w-4 h-4" />
                        <span>{selectedPostingan.like || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiMessageSquare className="w-4 h-4" />
                        <span>{selectedPostingan.komentar || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiShare2 className="w-4 h-4" />
                        <span>{selectedPostingan.share || 0}</span>
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm text-justify whitespace-pre-line">
                      {selectedPostingan.deskripsi}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-2"
                  >
                    <EmptyState text="Pilih postingan untuk melihat detail." />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Container kanan */}
        <div className="w-full lg:w-[70%] rounded-xl bg-white p-4 shadow-sm overflow-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-3">
              <h2 className="text-lg font-semibold text-gray-800">Tabel Postingan</h2>
              <div className="relative w-60">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FiSearch className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Cari postingan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {loading ? (
              <div className="flex justify-center items-center h-[180px]">
                <LoadingSpinner text="Memuat data postingan..." />
              </div>
            ) : filteredPostingan.length === 0 ? (
              <EmptyState text="Tidak ada postingan ditemukan." />
            ) : (
              <Pagination
                data={filteredPostingan}
                itemsPerPage={10}
                render={(currentItems, indexOfFirstItem) => (
                  <GenericTable
                    columns={["NO", "PENGGUNA", "JUDUL", "KATEGORI", "TANGGAL POSTING", "AKSI"]}
                    data={currentItems}
                    renderRow={(item, index) => [
                      <td key="no" className="p-3 text-sm font-semibold text-left">{indexOfFirstItem + index + 1}</td>,
                      <td key="user" className="p-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <img
                            src={
                              item.user?.profile?.startsWith("data:image")
                                ? item.user.profile
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.nama || "User")}&background=eee&color=555`
                            }
                            alt={item.user?.nama}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-gray-700 font-medium">{item.user?.username || "-"}</span>
                        </div>
                      </td>,
                      <td
                        key="judul"
                        className="p-3 text-sm text-gray-600 hover:underline hover:text-blue-600 cursor-pointer"
                        onClick={() => setSelectedPostingan(item)}
                        title="Lihat preview"
                      >
                        {item.judul}
                      </td>,
                      <td key="kategori" className="p-3 text-sm text-gray-600">{item.Kategori || "-"}</td>,
                      <td key="tanggal" className="p-3 text-sm text-gray-600">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit", month: "2-digit", year: "2-digit"
                        })}
                      </td>,
                      <td key="aksi" className="p-3">
                        <div className="flex space-x-3 text-gray-500 text-sm">
                          <button onClick={() => openEditModal(item)} title="Edit" className="hover:text-blue-600">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id_postingan)} title="Hapus" className="hover:text-red-600" disabled={loading}>
                            <FiTrash2 className="w-4 h-4" />
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
    </div>
  );
}