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
    bio: "",
    status: "unblokir",
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
        bio: user.bio || "",
        status: user.status === "nonaktif" ? "blokir" : "unblokir",
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
      const statusConverted = formData.status === "blokir" ? "nonaktif" : "aktif";
      onSave(user.id_user, { ...formData, status: statusConverted });
    }
  };

  if (!user) return null;

  return (
    <dialog id="modal_edit_user" className="modal" open>
      <div className="modal-box w-10/12 max-w-2xl relative p-4">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-red-600 text-xl"
          aria-label="Tutup"
        >
          <IoClose />
        </button>

        <h3 className="font-semibold text-xl mb-4 text-center text-gray-800">
          Edit Data Pengguna
        </h3>

        <form onSubmit={handleSubmit} className="grid gap-4">

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <label className="block font-medium text-sm text-gray-700">
                Foto Profil
              </label>
              <img
                src={
                  previewImage ||
                  "https://ui-avatars.com/api/?name=Guest&background=eee&color=555"
                }
                alt="Preview"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-300 shadow cursor-pointer hover:opacity-80 transition"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                accept="image/jpeg,image/png"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500">Klik gambar untuk memilih foto baru</p>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-3">
              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">Nama</label>
                <div className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                  <MdPerson className="text-lg text-gray-400 mr-1.5" />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full text-xs focus:outline-none"
                    placeholder="Masukkan nama"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">Email</label>
                <div className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                  <MdEmail className="text-lg text-gray-400 mr-1.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-xs focus:outline-none"
                    placeholder="Masukkan email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">Password</label>
                <div className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                  <MdLock className="text-lg text-gray-400 mr-1.5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-xs focus:outline-none"
                    placeholder="Kosongkan jika tidak diubah"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full text-xs px-2 py-2 border rounded bg-white shadow-sm focus:outline-none"
                >
                  <option value="unblokir">Unblokir</option>
                  <option value="blokir">Blokir</option>
                </select>
              </div>
              
            </div>

            {/* Container 3: kanan */}
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">Username</label>
                <div className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                  <MdAccountCircle className="text-lg text-gray-400 mr-1.5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full text-xs focus:outline-none"
                    placeholder="Masukkan username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full text-xs p-2 border rounded bg-white shadow-sm focus:outline-none resize-none min-h-[90px]"
                  placeholder="Masukkan bio pengguna"
                ></textarea>
              </div>
            </div>
          </div>


          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn text-xs px-4 py-1"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary text-xs px-4 py-1"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
