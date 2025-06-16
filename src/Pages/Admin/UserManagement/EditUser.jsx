import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdPerson, MdEmail, MdAccountCircle, MdLock } from "react-icons/md";

export default function EditUser({ user, onClose, onSave }) {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        username: "",
        password: "",
        profile: "",
        bio: "", // Tambahkan bio
    });

    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                nama: user.nama || "",
                email: user.email || "",
                username: user.username || "",
                password: "",
                profile: user.profile || "",
                bio: user.bio || "", // Set bio dari user
            });
            setPreviewImage(user.profile || "");
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    profile: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert("File harus berupa gambar JPG atau PNG.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave(user.id_user, formData);
        }
    };

    if (!user) return null;

    return (
        <dialog id="modal_edit_user" className="modal" open>
            <div className="modal-box w-11/12 max-w-5xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-red-600 text-3xl"
                >
                    <IoClose />
                </button>

                <h3 className="font-bold text-3xl mb-8 text-center text-gray-800">
                    Edit Data Pengguna
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* FOTO PROFIL & INPUT FILE */}
                    <div>
                        <div className="flex flex-col items-center gap-4">
                            <label className="block font-semibold text-lg text-gray-700">
                                Foto Profil
                            </label>
                            <img
                                src={previewImage || "https://ui-avatars.com/api/?name=Guest&background=eee&color=555"}
                                alt="Preview"
                                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-2 border-gray-300 shadow-md cursor-pointer hover:opacity-80 transition"
                                onClick={() => fileInputRef.current.click()}
                            />
                            <input
                                type="file"
                                accept="image/jpeg,image/png"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <p className="text-sm text-gray-500">Klik gambar untuk memilih foto baru</p>
                        </div>
                    </div>

                    {/* FORM INPUT */}
                    <div className="space-y-6">
                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Nama</label>
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                <MdPerson className="text-2xl text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    className="w-full text-lg focus:outline-none"
                                    placeholder="Masukkan nama"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Email</label>
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                <MdEmail className="text-2xl text-gray-400 mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full text-lg focus:outline-none"
                                    placeholder="Masukkan email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Username</label>
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                <MdAccountCircle className="text-2xl text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full text-lg focus:outline-none"
                                    placeholder="Masukkan username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Password</label>
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                <MdLock className="text-2xl text-gray-400 mr-3" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full text-lg focus:outline-none"
                                    placeholder="Kosongkan jika tidak diubah"
                                />
                            </div>
                        </div>

                        {/* BIO */}
                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full text-lg p-4 border rounded-lg bg-white shadow-sm focus:outline-none resize-none min-h-[100px]"
                                placeholder="Masukkan bio pengguna"
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="btn text-lg px-8 py-3">
                            Batal
                        </button>
                        <button type="submit" className="btn btn-primary text-lg px-8 py-3">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
