import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdTitle, MdDescription, MdCategory } from "react-icons/md";

export default function EditPostingan({ item, onClose, onSave }) {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        Kategori: "",
        gambar: "",
    });

    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (item) {
            setFormData({
                judul: item.judul || "",
                deskripsi: item.deskripsi || "",
                Kategori: item.Kategori || "",
                gambar: item.gambar || "",
            });
            setPreviewImage(item.gambar || "");
        }
    }, [item]);

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
                    gambar: reader.result,
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
            onSave(item.id_postingan, formData);
        }
    };

    if (!item) return null;

    return (
        <dialog id="modal_edit_postingan" className="modal" open>
            <div className="modal-box w-[90vw] max-w-[800px] relative">
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-red-600 text-2xl"
                    aria-label="Close modal"
                >
                    <IoClose />
                </button>

                {/* Judul */}
                <h3 className="font-semibold text-xl mb-6 text-center text-gray-800">
                    Edit Data Postingan
                </h3>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start"
                >
                    {/* Kolom Thumbnail */}
                    <div className="col-span-2 flex flex-col items-center gap-3">
                        <label className="block font-semibold text-sm text-gray-700">
                            Thumbnail
                        </label>
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full max-w-xs rounded-md object-cover border border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition"
                                onClick={() => fileInputRef.current.click()}
                            />
                        ) : (
                            <div
                                className="w-full max-w-xs h-40 rounded-md bg-gray-300 border border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition"
                                onClick={() => fileInputRef.current.click()}
                            />
                        )}

                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <p className="text-xs text-gray-500 text-center">
                            Klik gambar untuk memilih thumbnail baru
                        </p>
                    </div>

                    {/* Kolom Form */}
                    <div className="col-span-3 space-y-4">
                        <div>
                            <label className="block font-semibold text-sm mb-1 text-gray-700">Judul</label>
                            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
                                <MdTitle className="text-xl text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    className="w-full text-sm focus:outline-none"
                                    placeholder="Masukkan judul postingan"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold text-sm mb-1 text-gray-700">Deskripsi</label>
                            <textarea
                                name="deskripsi"
                                value={formData.deskripsi}
                                onChange={handleChange}
                                className="w-full text-sm p-3 border rounded-md bg-white shadow-sm focus:outline-none resize-none min-h-[100px]"
                                placeholder="Masukkan deskripsi"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-semibold text-sm mb-1 text-gray-700">Kategori</label>
                            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
                                <MdCategory className="text-xl text-gray-400 mr-2" />
                                <select
                                    name="Kategori"
                                    value={formData.Kategori}
                                    onChange={handleChange}
                                    className="w-full text-sm focus:outline-none bg-white"
                                    required
                                >
                                    <option value="" disabled>Pilih kategori</option>
                                    <option value="umum">Umum</option>
                                    <option value="olahraga">Olahraga</option>
                                    <option value="otomotif">Otomotif</option>
                                    <option value="sosial budaya">Sosial Budaya</option>
                                    <option value="politik">Politik</option>
                                    <option value="ekonomi">Ekonomi</option>
                                    <option value="teknologi">Teknologi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="col-span-1 lg:col-span-5 flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn px-6 py-2 text-sm"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary px-6 py-2 text-sm"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
