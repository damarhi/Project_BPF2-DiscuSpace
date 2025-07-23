import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const UserProfile = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef();
  const [activeProfileTab, setActiveProfileTab] = useState("postingan");


  const posts = [
    {
      id: 1,
      title: "Cara Membuat REST API dengan Laravel Sanctum",
      tags: ["laravel", "api", "backend"],
      date: "7 Maret 2025",
    },
    {
      id: 2,
      title: "Mengenal TailwindCSS untuk Pemula",
      tags: ["tailwind", "css", "frontend"],
      date: "12 Maret 2025",
    },
    {
      id: 3,
      title: "Tips Menjadi Junior Programmer yang Produktif",
      tags: ["karir", "tips", "pengembangan diri"],
      date: "20 Maret 2025",
    },
  ];


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };


  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Tautan berhasil disalin!");
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




const [user, setUser] = useState(null);


  // Ambil data user dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Berhasil Logout");
    navigate("/login");
  };


  return (
    <div>
      <div className="relative pt-58 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow p-8 text-center -mt-38">
            <img
              src={
              user?.profile &&
              user.profile !== "EMPTY" &&
              user.profile !== "NULL" &&
              user.profile.startsWith("data:image")
                ? user.profile
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nama?.split(" ")[0] || "Guest")}&background=eee&color=555`
            }
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
            />
            <h2 className="text-xl font-bold text-gray-800">{user?.nama || "Guest"}</h2>
            <p className="text-gray-500 mb-2">{user?.username || "Guest"}</p>


            <p className="text-gray-500 mb-2">{user?.bio || "Guest"}</p>
   


            {/* Tabs */}
            <div className="mt-6 flex justify-center gap-4 border-t border-gray-200 pt-4">
              <button
                onClick={() => setActiveProfileTab("postingan")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  activeProfileTab === "postingan"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Postingan
              </button>
              <button
                onClick={() => setActiveProfileTab("project")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  activeProfileTab === "project"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Project
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Konten utama */}
        <div className="lg:col-span-2 space-y-10">
          {activeProfileTab === "postingan" && (
            <>
              {/* Postingan Populer */}
              <div className="bg-white rounded-2xl shadow p-6 mt-6">
                <h3 className="text-gray-800 font-semibold mb-3">Postingan Populer</h3>
                <Slider {...sliderSettings}>
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      className="block rounded-xl p-4 hover:shadow transition border bg-gray-50"
                    >
                      <div className="flex flex-wrap gap-2 text-xs text-blue-500 mb-2">
                        {post.tags.map((tag, i) => (
                          <span key={i}>#{tag}</span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{post.title}</h4>
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </Link>
                  ))}
                </Slider>
              </div>


              {/* Postingan Terbaru */}
              <div className="bg-white rounded-2xl shadow p-6 mt-6">
                <h3 className="text-gray-800 font-semibold mb-3">Postingan Terbaru</h3>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      className="block p-4 mb-4 border rounded-lg hover:shadow bg-gray-50"
                    >
                      <div className="flex flex-wrap gap-2 text-xs text-blue-500 mb-2">
                        {post.tags.map((tag, index) => (
                          <span key={index}>#{tag}</span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{post.title}</h4>
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </Link>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">Belum ada postingan terbaru.</div>
                )}
              </div>
            </>
          )}


          {activeProfileTab === "project" && (
            <div className="bg-white rounded-2xl shadow p-6 text-gray-500 text-sm mt-6">
              Belum ada project.
            </div>
          )}
        </div>


        {/* Sidebar */}
        <div className="space-y-8 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="text-blue-600 font-semibold mb-2 text-sm">Aktivitas</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>68 Diskusi</li>
              <li>24 Komentar</li>
              <li>9 Reaksi</li>
            </ul>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="text-blue-600 font-semibold mb-2 text-sm">Keahlian</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>HTML (90%)</li>
              <li>CSS (85%)</li>
              <li>JavaScript (80%)</li>
              <li>React (75%)</li>
              <li>Next.js (70%)</li>
            </ul>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="text-blue-600 font-semibold mb-2 text-sm">Sosial Media</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <FaGithub className="text-xl text-gray-700" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <FaLinkedin className="text-xl text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserProfile;



