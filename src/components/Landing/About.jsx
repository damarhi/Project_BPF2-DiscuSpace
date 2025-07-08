import React, { useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaRegUser, FaEye, FaBullseye, FaUsers } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import team1 from "../../../public/img/damar.jpg";
import team2 from"../../../public/img/dafis.png";
import team3 from "../../../public/img/Dafi.jpg";
export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <section id="about" className="section-area py-16" data-aos="fade-up">
        <div className="container">
          <h6 className="text-lg font-extrabold text-blue-600 text-center mb-12 flex items-center justify-center gap-2">
            <FaRegUser className="text-blue-500 text-2xl" />
            Tentang Kami
          </h6>

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
      <section id="team" className="section-area py-16">
        <div className="container">
          {/* Judul Section */}
          <div
            className="scroll-revealed text-center max-w-[550px] mx-auto mb-12"
            data-aos="fade-up"
          >
            <h6 className="mb-2 text-lg font-semibold text-blue-600 flex items-center justify-center gap-2">
              <FaUsers className="text-2xl text-blue-500" />
              Tim Kami
            </h6>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">Tim Kreatif Kami</h2>
            <p className="text-gray-600">
              Kami adalah tim yang terdiri dari individu kreatif dan berdedikasi tinggi,
              siap membangun platform komunitas digital yang kuat dan kolaboratif.
            </p>
          </div>

          {/* Grid Anggota Tim */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Damar */}
            <div className="flex justify-center" data-aos="fade-up">
              <figure className="group w-[260px] h-[360px] bg-white rounded-xl shadow-lg px-5 pb-10 pt-12 transition-transform hover:-translate-y-1">
                <div className="relative z-10 mx-auto mb-5 h-[110px] w-[110px]">
                  <img
                    src={team1}
                    alt="Damar"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 -z-10 h-8 w-8 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute top-0 right-0 -z-10 h-8 w-8 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
                <figcaption className="text-center">
                  <h4 className="mb-1 text-lg font-semibold text-gray-800">Damar Nur Hidayat</h4>
                  <p className="mb-4 text-sm text-gray-500">Developer</p>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-gray-400 hover:text-blue-600">Mahasiswa Generasi 23
                      <br />Teknik Informatika
                      <br />Jurusan Teknologi Informasi
                      <br /> Politeknik Caltex Riau</p>
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Dafis Wahyuni */}
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="100">
              <figure className="group w-[260px] h-[360px] bg-white rounded-xl shadow-lg px-5 pb-10 pt-12 transition-transform hover:-translate-y-1">
                <div className="relative z-10 mx-auto mb-5 h-[110px] w-[110px]">
                  <img
                    src={team2}
                    alt="Dafis Wahyuni"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 -z-10 h-8 w-8 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute top-0 right-0 -z-10 h-8 w-8 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
                <figcaption className="text-center">
                  <h4 className="mb-1 text-lg font-semibold text-gray-800">Dafis Wahyuni</h4>
                  <p className="mb-4 text-sm text-gray-500">Developer</p>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-gray-400 hover:text-blue-600">Mahasiswa Generasi 23
                      <br />Teknik Informatika
                      <br />Jurusan Teknologi Informasi
                      <br /> Politeknik Caltex Riau</p>
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Dafi Hibrizi */}
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
              <figure className="group w-[260px] h-[360px] bg-white rounded-xl shadow-lg px-5 pb-10 pt-12 transition-transform hover:-translate-y-1">
                <div className="relative z-10 mx-auto mb-5 h-[110px] w-[110px]">
                  <img
                    src={team3}
                    alt="Dafi Hibrizi"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 -z-10 h-8 w-8 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute top-0 right-0 -z-10 h-8 w-8 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
                <figcaption className="text-center">
                  <h4 className="mb-1 text-lg font-semibold text-gray-800">Dafi Hibrizi</h4>
                  <p className="mb-4 text-sm text-gray-500">Developer</p>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-gray-400 hover:text-blue-600">Mahasiswa Generasi 23
                      <br />Teknik Informatika
                      <br />Jurusan Teknologi Informasi
                      <br /> Politeknik Caltex Riau</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
