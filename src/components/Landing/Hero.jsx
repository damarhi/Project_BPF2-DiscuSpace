import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="relative text-white pt-10 md:pt-6 lg:pt-4 pb-16"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Kiri: Teks */}
        <div
          className="w-full md:w-1/2 text-center md:text-left"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Temukan, Terhubung, dan
            <br className="hidden md:block" />
            Berdiskusi Bersama Sesuai Minatmu 💬
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            DiscuSpace adalah platform komunitas modern yang memungkinkan kamu
            menjelajahi topik favorit, berbagi pemikiran, dan membangun koneksi
            dalam forum yang rapi dan terorganisir.
          </p>
          <Link
            to="/register"
            className="btn bg-white text-blue-700 hover:bg-gray-100 font-semibold px-6 py-2 rounded-md"
          >
            Mulai Sekarang
          </Link>
        </div>

        {/* Kanan: Animasi / Gambar */}
        <div
          className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <DotLottieReact
            src="https://lottie.host/51b21f68-8a75-47e9-bf9f-0a5b6414f812/bDX1A9TmNY.lottie"
            loop
            autoplay
            style={{ width: '1000px', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
}
