import React from "react";
import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";
import Hero from "../components/Landing/Hero";
import Services from "../components/Landing/Services";
import Testimoni from "../components/Landing/Testmoni";
import FAQ from "../components/Landing/FAQ";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-600 text-white">
      <Navbar />

      {/* SECTION 1: NAVBAR + HERO di latar biru */}
      <section id="beranda" className="bg-blue-600 text-white">
        <Hero />
      </section>

      {/* SECTION 2: CONTENT + FOOTER di latar abu */}
      <section className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>

        {/* Beri ID pada setiap section agar dapat di-scroll ke sana */}
        <section id="layanan">
          <Services />
        </section>

        <section id="testimoni">
          <Testimoni />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <Footer />
      </section>
    </div>
  );
}
