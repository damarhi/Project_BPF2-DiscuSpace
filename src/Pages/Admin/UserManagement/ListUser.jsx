import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { userAPI } from "../../../Services/userAPI";
import Header from "../../../components/admin/Header";
import GenericTable from "../../../components/GenereicTable";
import AlertBox from "../../../components/AlertBox";
import EditUser from "../../Admin/UserManagement/EditUser";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EmptyState from "../../../components/EmptyState";

export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { onOpenSidenav } = useOutletContext();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await userAPI.fetchUser();
            setUsers(data);
        } catch (err) {
            setError("Gagal memuat data pengguna.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id_user) => {
        const konfirmasi = confirm("Yakin ingin menghapus User ini?");
        if (!konfirmasi) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");
            await userAPI.deleteUser(id_user);
            await loadUsers();
            setSuccess("Data pengguna berhasil dihapus.");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openEditModal = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleSaveUser = async (id_user, updatedData) => {
        try {
            setLoading(true);
            await userAPI.updateUser(id_user, updatedData);
            setSuccess("Pengguna berhasil diperbarui.");
            loadUsers();
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
            <Header brandText="Daftar Pengguna" brandLink="/listuser" title="Daftar Pengguna" onOpenSidenav={onOpenSidenav} />
            <div className="p-6 bg-[#f4f7fe] min-h-screen">
                <div className="rounded-2xl bg-white p-6 shadow-md overflow-x-auto">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4 md:gap-0">
                        <h2 className="text-xl font-bold text-gray-800">Tabel Pengguna</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="relative w-72">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FiSearch />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search user..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {error && <AlertBox type="error">{error}</AlertBox>}
                    {success && <AlertBox type="success">{success}</AlertBox>}

                    {loading && (
                        <div className="flex justify-center items-center h-[200px]">
                            <LoadingSpinner text="Memuat data pengguna..." />
                        </div>
                    )}

                    {!loading && filteredUsers.length === 0 && (
                        <EmptyState text="Tidak ada pengguna yang ditemukan." />
                    )}

                    {!loading && filteredUsers.length > 0 && (
                        <Pagination
                            data={filteredUsers}
                            itemsPerPage={10}
                            render={(currentUsers, indexOfFirstUser) => (
                                <div className="min-w-[900px] overflow-x-auto">
                                    <GenericTable className="min-w-[900px]"
                                        columns={["NO", "NAMA", "EMAIL", "USERNAME", "BIO", "AKSI"]}
                                        data={currentUsers}
                                        renderRow={(user, index) => [
                                            <td key="no" className="p-4 text-left font-semibold">
                                                {indexOfFirstUser + index + 1}
                                            </td>,
                                            <td key="nama" className="p-4 whitespace-nowrap font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={
                                                            user.profile?.startsWith("data:image")
                                                                ? user.profile
                                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama || "Guest")}&background=eee&color=555`
                                                        }
                                                        alt={user.nama}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <span className=" text-gray-700 font-semibold">{user.nama}</span>
                                                </div>
                                            </td>,
                                            <td key="email" className="p-4 whitespace-nowrap text-gray-600">{user.email}</td>,
                                            <td key="username" className="p-4 whitespace-nowrap text-gray-600">{user.username}</td>,
                                            <td key="bio" className="p-4 whitespace-nowrap text-gray-600">{user.bio || "-"}</td>,
                                            <td key="aksi" className="p-4 whitespace-nowrap">
                                                <div className="flex space-x-4 text-gray-500">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id_user)}
                                                        className="hover:text-red-600"
                                                        title="Delete"
                                                        disabled={loading}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        ]}
                                    />
                                </div>
                            )}
                        />
                    )}

                    {showEditModal && (
                        <EditUser
                            user={selectedUser}
                            onClose={closeEditModal}
                            onSave={handleSaveUser}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
