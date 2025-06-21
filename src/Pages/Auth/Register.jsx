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
    <div className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Create Your Account ✨
      </h2>

      {error && (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
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
        <div className="mb-5">
          <label htmlFor="nama" className="block text-sm font-medium text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={dataForm.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="Enter your fullname"
            required
          />
        </div>

        <div className="mb-5">
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
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
            Password
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

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
            Confirm Password
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

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="mt-4 text-center text-sm text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-medium">
            Log in here
          </Link>
        </div>
      </form>
    </div>
  );
}
