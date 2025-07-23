import { useEffect, useState } from "react";
import { FiTrash2, FiEye } from "react-icons/fi";
import { userAPI } from "../../../Services/userAPI";
import { testimoniAPI } from "../../../Services/testimoniAPI";
import Header from "../../../components/admin/Header";
import GenericTable from "../../../components/GenereicTable";
import AlertBox from "../../../components/AlertBox";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EmptyState from "../../../components/EmptyState";
import ModalTestimoni from "./ModalTestimoni"; // pastikan path sesuai

export default function Testimoni() {
  const [testimoni, setTestimoni] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedTestimoni, setSelectedTestimoni] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [testimoniData, userData] = await Promise.all([
        testimoniAPI.fetchTestimoni(),
        userAPI.fetchUser(),
      ]);

      setTestimoni(
        testimoniData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
      setUsers(userData);
    } catch (err) {
      setError("Gagal memuat data testimoni atau pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimoni = async (id_testimoni) => {
    const konfirmasi = confirm("Yakin ingin menghapus testimoni ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await testimoniAPI.deleteTestimoni(id_testimoni);
      setSuccess("Testimoni berhasil dihapus.");
      await loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (testimoniItem, user) => {
    setSelectedTestimoni(testimoniItem);
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredTestimoni = testimoni.filter((item) => {
    const user = users.find((u) => u.id_user === item.id_user);
    return (
      user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.nama?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="mt-4">
      <Header brandText="Testimoni" title="Data Testimoni Pengguna" />
      <div className="p-3 bg-[#f4f7fe] min-h-screen">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Daftar Testimoni</h2>
            <input
              type="text"
              placeholder="Cari nama/username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-60 px-3 py-1.5 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {error && <AlertBox type="error">{error}</AlertBox>}
          {success && <AlertBox type="success">{success}</AlertBox>}

          {loading ? (
            <div className="flex justify-center items-center h-[180px]">
              <LoadingSpinner text="Memuat data testimoni..." />
            </div>
          ) : filteredTestimoni.length === 0 ? (
            <EmptyState text="Tidak ada testimoni ditemukan." />
          ) : (
            <Pagination
              data={filteredTestimoni}
              itemsPerPage={10}
              render={(currentItems, indexOfFirstItem) => (
                <div className="min-w-[900px] overflow-x-auto">
                  <GenericTable
                    columns={["NO", "PENGGUNA", "RATING", "AKSI"]}
                    data={currentItems}
                    renderRow={(item, index) => {
                      const user = users.find((u) => u.id_user === item.id_user);
                      return [
                        <td key="no" className="p-3 text-sm font-semibold">
                          {indexOfFirstItem + index + 1}
                        </td>,
                        <td key="user" className="p-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <img
                              src={
                                user?.profile?.startsWith("data:image")
                                  ? user.profile
                                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      user?.nama || "User"
                                    )}&background=eee&color=555`
                              }
                              alt="User"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-semibold text-gray-800">{user?.nama}</div>
                              <div className="text-xs text-gray-500">@{user?.username}</div>
                            </div>
                          </div>
                        </td>,
                        <td key="rating" className="p-3 text-blue-500 font-bold text-xl">
                          {"★".repeat(item.rating)}
                          <span className="text-gray-300">
                            {"☆".repeat(5 - item.rating)}
                          </span>
                        </td>,
                        <td key="aksi" className="p-3">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleOpenModal(item, user)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Lihat detail testimoni"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimoni(item.id_testimoni)}
                              className="text-red-600 hover:text-red-800"
                              title="Hapus testimoni"
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

      {/* Modal Detail */}
      <ModalTestimoni
        open={showModal}
        onClose={() => setShowModal(false)}
        testimoni={selectedTestimoni}
        user={selectedUser}
      />
    </div>
  );
}
