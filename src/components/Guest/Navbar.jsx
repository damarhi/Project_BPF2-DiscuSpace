import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "../../Services/userAPI";
import { useState, useEffect, useRef } from "react";


export default function Navbar() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
    profile: "",
    bio: "",
  });
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        nama: parsed.nama || "",
        username: parsed.username || "",
        email: parsed.email || "",
        password: parsed.password || "",
        profile: parsed.profile || "",
        bio: parsed.bio || "",
      });
    }
  }, [showModal]);


  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Berhasil Logout");
    navigate("/login");
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profile: reader.result }));
    };
    reader.readAsDataURL(file);
  };


  const handleSave = async () => {
    try {
      if (!user?.id_user) throw new Error("ID user tidak ditemukan");


      const updatedUser = { ...user, ...formData };
      await userAPI.updateUser(user.id_user, updatedUser);


      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setShowModal(false);
      alert("Perubahan akun berhasil disimpan.");
      window.location.reload();
    } catch (err) {
      console.error("Gagal menyimpan perubahan:", err);
      alert("Terjadi kesalahan saat menyimpan perubahan akun.");
    }
  };


  return (
    <div>
      <nav className="bg-white border-b shadow-sm px-6 py-3 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-xl font-extrabold tracking-wide">
            <Link to="/" className="flex items-center space-x-1">
              <span className="bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">DISCU</span>
              <span className="text-blue-400">SPACE</span>
            </Link>
          </h1>


          <details className="relative group">
            <summary className="list-none cursor-pointer flex items-center gap-3 focus:outline-none hover:bg-gray-100 px-3 py-2 rounded-lg transition">
              <span className="text-sm font-medium text-gray-800">
                {user?.nama || "Guest"}
              </span>
              <img
                src={
                  user?.profile?.startsWith("data:image")
                    ? user.profile
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nama?.split(" ")[0] || "Guest")}&background=eee&color=555`
                }
                className="w-10 h-10 rounded-full border shadow object-cover"
                alt="User Avatar"
              />
            </summary>


            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg z-50 animate-fade-in group-open:block hidden">
              <div className="px-4 py-3 border-b">
                <p className="text-sm text-gray-500">
                  👋 Hey, <span className="font-semibold text-gray-800">{user?.nama?.split(" ")[0] || "User"}</span>
                </p>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded transition">
                    Profil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowModal(true)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition"
                  >
                    Pengaturan Akun
                  </button>
                </li>
              </ul>
              <div className="py-2 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 text-sm text-red-600 px-4 py-2 hover:bg-gray-100 rounded transition"
                >
                  <FiLogOut className="text-base" /> Keluar
                </button>
              </div>
            </div>
          </details>
        </div>
      </nav>


      {showModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Pengaturan Akun</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-center text-gray-700 mb-2">Foto Profil</label>
                <div className="flex justify-center mb-2">
                  <img
                    src={
                      formData.profile?.startsWith("data:image")
                        ? formData.profile
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nama || "Guest")}&background=eee&color=555`
                    }
                    className="w-20 h-20 rounded-full border shadow object-cover cursor-pointer hover:opacity-80 transition"
                    alt="User Avatar"
                    onClick={() => fileInputRef.current.click()}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {['nama', 'username', 'bio', 'email', 'password'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100">
                Batal
              </button>
              <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded">
                Simpan Perubahan
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



