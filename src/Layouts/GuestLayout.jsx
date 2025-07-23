import { Outlet } from "react-router-dom";
import Navbar from "../components/Guest/Navbar";
import Footer from "../components/Guest/Footer";


export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden relative">
      {/* Bagian background biru */}
      <div className="absolute top-0 left-0 w-full h-[350px] bg-blue-600 rounded-b-3xl z-0"></div>


      {/* Navbar sticky */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>


      {/* Konten utama */}
      <main className="relative z-10 px-6 py-10 max-w-6xl mx-auto">
        <Outlet />
      </main>


      {/* Footer */}
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
}



