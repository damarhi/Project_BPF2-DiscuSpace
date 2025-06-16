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
            <div className="modal-box w-[95%] max-w-6xl relative">
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-red-600 text-3xl"
                >
                    <IoClose />
                </button>

                {/* Judul */}
                <h3 className="font-bold text-3xl mb-8 text-center text-gray-800">
                    Edit Data Postingan
                </h3>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
                >
                    {/* Kolom Thumbnail */}
                    <div className="col-span-2 flex flex-col items-center gap-4">
                        <label className="block font-semibold text-lg text-gray-700">
                            Thumbnail
                        </label>
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full max-w-sm rounded-md object-cover border-2 border-gray-300 shadow-md cursor-pointer hover:opacity-80 transition"
                                onClick={() => fileInputRef.current.click()}
                            />
                        ) : (
                            <div
                                className="w-full max-w-sm h-[200px] rounded-md bg-gray-300 border-2 border-gray-300 shadow-md cursor-pointer hover:opacity-80 transition"
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
                        <p className="text-sm text-gray-500 text-center">
                            Klik gambar untuk memilih thumbnail baru
                        </p>
                    </div>

                    {/* Kolom Form */}
                    <div className="col-span-3 space-y-6">
                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Judul</label>
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                <MdTitle className="text-2xl text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    className="w-full text-lg focus:outline-none"
                                    placeholder="Masukkan judul postingan"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Deskripsi</label>
                            <textarea
                                name="deskripsi"
                                value={formData.deskripsi}
                                onChange={handleChange}
                                className="w-full text-lg p-4 border rounded-lg bg-white shadow-sm focus:outline-none resize-none min-h-[120px]"
                                placeholder="Masukkan deskripsi"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-1 text-gray-700">Kategori</label>
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                <MdCategory className="text-2xl text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    name="Kategori"
                                    value={formData.Kategori}
                                    onChange={handleChange}
                                    className="w-full text-lg focus:outline-none"
                                    placeholder="Masukkan kategori"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="col-span-1 lg:col-span-5 flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn text-lg px-8 py-3"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary text-lg px-8 py-3"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
