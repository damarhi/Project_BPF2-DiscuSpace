import React from "react";
import logo from "../../assets/Image/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Deskripsi Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="h-12" />
            <h2 className="text-2xl font-bold text-blue-400">
              Discu<span className="text-blue-600">SPACE</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-black">
            Platform diskusi dan edukasi daring yang mendukung kolaborasi,
            interaksi pengguna, dan pertumbuhan komunitas secara sehat.
          </p>
          {/* Sosial Media */}
          <div className="flex gap-4 mt-4 text-blue-400 text-lg">
            <a href="#"><i className="lni lni-facebook-filled" /></a>
            <a href="#"><i className="lni lni-twitter-filled" /></a>
            <a href="#"><i className="lni lni-instagram" /></a>
            <a href="#"><i className="lni lni-linkedin-original" /></a>
            <a href="#"><i className="lni lni-google" /></a>
          </div>
        </div>

        {/* Perusahaan */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-black">Perusahaan</h4>
          <ul className="space-y-2 text-sm text-black">
            <li><a href="#beranda" className="hover:text-blue-400">Tentang Kami</a></li>
            <li><a href="#layanan" className="hover:text-blue-400">Layanan</a></li>
            <li><a href="#" className="hover:text-blue-400">Partner</a></li>
            <li><a href="#testimoni" className="hover:text-blue-400">Testimoni</a></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-black">Bantuan</h4>
          <ul className="space-y-2 text-sm text-black">
            <li><a href="#faq" className="hover:text-blue-400">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400">Panduan Pengguna</a></li>
            <li><a href="#" className="hover:text-blue-400">Kritik & Saran</a></li>
            <li><a href="#" className="hover:text-blue-400">Kontak</a></li>
          </ul>
        </div>

        {/* Kontak Kami */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-black">Kontak Kami</h4>
          <p className="text-sm mb-2 text-black">
            <i className="lni lni-phone text-blue-400 mr-1" /> (021) 1234 5678
          </p>
          <p className="text-sm text-black">
            <i className="lni lni-envelope text-blue-400 mr-1" /> discuspace@mail.com
          </p>
        </div>
      </div>

      {/* Footer Bawah */}
      <div className="mt-10 border-t border-gray-00 pt-6 text-center text-xs text-black">
        <p>&copy; 2025 DiscuSPACE. Hak cipta dilindungi undang-undang.</p>
        <div className="mt-2 flex justify-center gap-4 flex-wrap">
          <a href="#" className="hover:text-blue-400">Kebijakan Privasi</a>
          <a href="#" className="hover:text-blue-400">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-blue-400">Peta Situs</a>
        </div>
      </div>
    </footer>
  );
}
