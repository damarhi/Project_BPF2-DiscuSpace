import { useState, useEffect } from "react";
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


  const [loggedUser, setLoggedUser] = useState(null);
useEffect(() => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (storedUser) {
    setLoggedUser(JSON.parse(storedUser));
  }
}, []);




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
        setError("Email atau kata sandi salah.");
      } else if (user.status === "nonaktif") {
        setError("Akun Anda sedang diblokir.");
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setLoggedUser(user);
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");


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
      Mohon tunggu...
    </div>
  ) : null;


  return (
    <div className="bg-blue-600 p-8 rounded-2xl shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-3 text-center">
        Selamat Datang Kembali 👋
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
            placeholder="Masukkan email Anda"
            required
          />
        </div>


        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">
            Kata Sandi
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
          className="w-full bg-green-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Sedang masuk..." : "Masuk"}
        </button>


        <div className="mt-4 flex justify-between text-sm">
          <Link to="/forgot" className="text-white  hover:font-bold">
            Lupa Kata Sandi?
          </Link>
          <Link to="/register" className="text-white  hover:font-bold">
            Daftar Akun
          </Link>
        </div>
      </form>
    </div>
  );
}



