import React, { useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaRegUser, FaEye, FaBullseye } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="about" className="section-area py-16" data-aos="fade-up">
      <div className="container">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-12 flex items-center justify-center gap-2">
          <FaRegUser className="text-blue-500 text-3xl" />
          Tentang Kami
        </h1>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 items-center">
          {/* Kiri: Animasi */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="100">
            <figure className="scroll-revealed max-w-[580px] mx-auto">
              <DotLottieReact
                src="https://lottie.host/6d8e337c-1ad8-4b68-a6f3-c2f2369058c7/BBAj3mPbDr.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </figure>
          </div>

          {/* Kanan: Isi Konten */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="200">
            <div className="scroll-revealed mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                DiscuSpace: Komunitas Digital Cerdas dan Terstruktur
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">
              <div>
                <p>
                  DiscuSpace adalah platform komunitas daring yang dirancang untuk memfasilitasi diskusi dalam grup dan forum secara terstruktur. Kami mengutamakan kemudahan pengguna dalam menelusuri topik sesuai minat dan berinteraksi dalam lingkungan yang produktif dan inklusif.
                </p>
                <p className="mt-2">
                  Dengan fitur-fitur canggih dan navigasi yang intuitif, DiscuSpace memungkinkan penggunanya untuk terhubung, berbagi ide, dan membangun komunitas yang kuat berbasis pengetahuan.
                </p>
              </div>

              <div>
                <h4 className="flex items-center text-blue-500 font-semibold text-base gap-2">
                  <FaEye /> Visi
                </h4>
                <p className="mt-1">
                  Menjadi platform diskusi daring terdepan yang menyediakan ruang interaktif, edukatif, dan positif bagi seluruh lapisan masyarakat dalam berbagi pemikiran, pengetahuan, dan solusi.
                </p>
              </div>

              <div>
                <h4 className="flex items-center text-blue-500 font-semibold text-base gap-2">
                  <FaBullseye /> Misi
                </h4>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Mendorong interaksi sehat dan produktif di dalam komunitas digital.</li>
                  <li>Menyediakan sistem forum yang rapi, aman, dan mudah digunakan.</li>
                  <li>Mendukung pertukaran wawasan, pemecahan masalah, serta kolaborasi lintas topik dan komunitas.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
