import React from "react";
import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";
import Hero from "../components/Landing/Hero";

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* SECTION 1: NAVBAR + HERO di latar biru */}
      <section className="bg-blue-800 text-white">
        <Navbar />
        <Hero />
      </section>

      {/* SECTION 2: CONTENT + FOOTER di latar abu */}
      <section className="flex-1 bg-gray-200 text-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold mb-4">Ini Landing</h2>
          <p>Selamat datang di halaman landing kami.</p>
        </div>
        <Footer />
      </section>
    </div>
  );
}
