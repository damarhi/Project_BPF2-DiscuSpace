import React, { useEffect } from "react";
import {
    FaComments,
    FaUserShield,
    FaMobileAlt,
    FaCogs,
    FaStream,
    FaChartLine,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Services() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <section id="services" className="w-screen bg-gray-100 py-16">
            <div className="container px-4 mx-auto">
                <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12" data-aos="fade-up">
                    {/* Tambahkan ikon sebelum teks Layanan */}
                    <div className="flex justify-center items-center gap-2 mb-2 text-blue-600">
                        <FaCogs className="text-2xl" />
                        <h6 className="block text-lg font-semibold">Layanan</h6>
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-800">Fitur Unggulan Kami</h2>
                    <p className="text-gray-600">
                        DiscuSpace menghadirkan fitur-fitur terbaik untuk membangun komunitas diskusi yang aktif, aman, dan mudah dikelola.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* 1 */}
                    <div className="scroll-revealed" data-aos="fade-up">
                        <div className="group hover:-translate-y-1 transition-transform">
                            <div className="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px] bg-blue-600 text-white">
                                <FaComments />
                            </div>
                            <div className="w-full">
                                <h4 className="text-[1.25rem] font-semibold mb-5 leading-tight">
                                    Forum Diskusi Interaktif
                                </h4>
                                <p className="text-gray-600">
                                    Fasilitasi percakapan aktif antaranggota komunitas dengan sistem forum yang rapi dan terorganisir.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="scroll-revealed" data-aos="fade-up" data-aos-delay="100">
                        <div className="group hover:-translate-y-1 transition-transform">
                            <div className="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px] bg-blue-600 text-white">
                                <FaUserShield />
                            </div>
                            <div className="w-full">
                                <h4 className="text-[1.25rem] font-semibold mb-5 leading-tight">
                                    Keamanan & Privasi
                                </h4>
                                <p className="text-gray-600">
                                    Data pengguna terlindungi dengan baik dan fitur pelaporan membuat ruang diskusi tetap aman.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="scroll-revealed" data-aos="fade-up" data-aos-delay="200">
                        <div className="group hover:-translate-y-1 transition-transform">
                            <div className="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px] bg-blue-600 text-white">
                                <FaMobileAlt />
                            </div>
                            <div className="w-full">
                                <h4 className="text-[1.25rem] font-semibold mb-5 leading-tight">
                                    Desain Responsif
                                </h4>
                                <p className="text-gray-600">
                                    Tampil optimal di semua perangkat—baik desktop, tablet, maupun ponsel pintar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className="scroll-revealed" data-aos="fade-up" data-aos-delay="300">
                        <div className="group hover:-translate-y-1 transition-transform">
                            <div className="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px] bg-blue-600 text-white">
                                <FaCogs />
                            </div>
                            <div className="w-full">
                                <h4 className="text-[1.25rem] font-semibold mb-5 leading-tight">
                                    Pengelolaan Mudah
                                </h4>
                                <p className="text-gray-600">
                                    Panel admin intuitif untuk mengatur grup, topik, pengguna, serta moderasi diskusi.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5 */}
                    <div className="scroll-revealed" data-aos="fade-up" data-aos-delay="400">
                        <div className="group hover:-translate-y-1 transition-transform">
                            <div className="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px] bg-blue-600 text-white">
                                <FaStream />
                            </div>
                            <div className="w-full">
                                <h4 className="text-[1.25rem] font-semibold mb-5 leading-tight">
                                    Navigasi Terstruktur
                                </h4>
                                <p className="text-gray-600">
                                    Forum dan grup dikategorikan dengan baik, memudahkan eksplorasi topik diskusi.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6 */}
                    <div className="scroll-revealed" data-aos="fade-up" data-aos-delay="500">
                        <div className="group hover:-translate-y-1 transition-transform">
                            <div className="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px] bg-blue-600 text-white">
                                <FaChartLine />
                            </div>
                            <div className="w-full">
                                <h4 className="text-[1.25rem] font-semibold mb-5 leading-tight">
                                    Statistik Komunitas
                                </h4>
                                <p className="text-gray-600">
                                    Lacak pertumbuhan komunitas dengan grafik jumlah pengguna, postingan, dan interaksi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
