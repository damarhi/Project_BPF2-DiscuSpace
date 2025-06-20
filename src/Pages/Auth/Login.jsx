import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { userAPI } from "../../Services/userAPI";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
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

    try {
      const users = await userAPI.fetchUser();

      const user = users.find(
        (u) =>
          u.email === dataForm.email &&
          u.password === dataForm.password
      );

      if (!user) {
        setError("Email atau password salah.");
      } else if (user.status === "nonaktif") {
        setError("Akun Anda sedang diblokir.");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login berhasil!");

        if (user.role === "admin") {
          navigate("/");
        } else {
          navigate("/guest");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Welcome Back 👋
      </h2>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 flex justify-between text-sm">
          <Link to="/forgot" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
