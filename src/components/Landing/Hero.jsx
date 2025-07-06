import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Hero() {
  return (
    <section className="relative text-white pt-20 md:pt-16 lg:pt-12 pb-16">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">

        {/* Kiri: Teks */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Bergabunglah dalam<br />
            Diskusi Digital yang<br />
            Terstruktur 💬
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            DiscuSpace adalah platform komunitas daring yang dirancang untuk memfasilitasi diskusi berdasarkan minat, dalam grup dan forum yang terstruktur, rapi, dan mudah ditelusuri.
          </p>
          <Link
            to="/register"
            className="btn bg-white text-blue-700 hover:bg-gray-100 font-semibold px-6 py-2 rounded-md"
          >
            Mulai Sekarang
          </Link>

        </div>

        {/* Kanan: Animasi / Gambar */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
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
