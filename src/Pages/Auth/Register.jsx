import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { userAPI } from "../../Services/userAPI";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nama: dataForm.nama,
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password,
        role: "guest",
        profile: "",
        bio: "",
        created_at: new Date().toISOString(),
      };

      const { data, error: insertError } = await userAPI.createUser(userData);

      if (insertError) {
        setError("Registrasi gagal: " + (insertError.message || "Terjadi kesalahan."));
      } else {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration error:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Registrasi gagal.");
      } else if (err?.message) {
        setError("Registrasi gagal: " + err.message);
      } else {
        setError("Terjadi kesalahan saat registrasi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 p-8 rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Buat Akun Anda ✨
      </h2>

      {error && (
        <div className="bg-red-200 mb-4 p-5 text-sm font-light text-gray-600 rounded flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
          <ImSpinner2 className="me-2 animate-spin" />
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-white mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={dataForm.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
            Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={dataForm.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
              placeholder="nama@contoh.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
              placeholder="********"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
              placeholder="********"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-transparent mb-1">.</label>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 hover:bg-blue-400 text-white font-semibold rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-white">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-white font-medium hover:font-bold">
            Masuk di sini
          </Link>
        </div>
      </form>

    </div>
  );
}
