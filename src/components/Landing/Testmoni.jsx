import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { testimoniAPI } from "../../Services/testimoniAPI";
import { userAPI } from "../../Services/userAPI";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiCommentDetail } from "react-icons/bi";


export default function Testimoni() {
  const [testimonials, setTestimonials] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimoniData, userData] = await Promise.all([
          testimoniAPI.fetchTestimoni(),
          userAPI.fetchUser(),
        ]);
        setTestimonials(testimoniData);
        setUsers(userData);
      } catch (error) {
        console.error("Gagal memuat data testimoni atau user:", error);
      }
    };
    fetchData();
    AOS.init({ duration: 800, once: true });
  }, []);

  const getUserInfo = (id) => {
    const user = users.find((u) => u.id_user === id);
    return user
      ? {
          nama: user.nama || "Pengguna",
          username: user.username || "tidak diketahui",
        }
      : { nama: "Pengguna", username: `id ${id}` };
  };

  const handleNext = () => {
    const maxIndex = testimonials.length - slidesToShow;
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const getSlidesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) return 2;
    if (screenWidth >= 768) return 1;
    return 1;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = 100 / slidesToShow;

  return (
    <section id="testimonials" className="section-area py-16 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className="scroll-revealed text-center max-w-[550px] mx-auto mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-2 text-primary">
            <BiCommentDetail className="text-lg" />
            <h6 className="block text-lg font-semibold">Ulasan Pengguna</h6>
          </div>
          <h2 className="mb-6 text-3xl font-bold">Testimoni Kami</h2>
          <p className="text-gray-600">
            Berikut adalah beberapa testimoni dari pengguna yang telah
            menggunakan platform DiscuSpace.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / testimonials.length)}%)`,
              width: `${(testimonials.length / slidesToShow) * 100}%`,
            }}
          >
            {testimonials.map((item, index) => {
              const { nama, username } = getUserInfo(item.id_user);
              return (
                <div
                  key={item.id_testimoni}
                  className="px-3"
                  style={{ width: `${cardWidth}%` }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="rounded-xl bg-white px-5 py-8 shadow-md sm:px-8 h-full flex flex-col justify-between">
                    <figure className="flex items-center gap-4 mb-4">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-200 flex items-center justify-center font-bold text-blue-500">
                        {nama?.charAt(0) || "U"}
                      </div>
                      <figcaption className="flex-grow">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {nama}
                        </h3>
                        <p className="text-xs text-gray-500">@{username}</p>
                      </figcaption>
                    </figure>

                    <p className="mb-6 text-base text-gray-600">
                      “{item.isi_testimoni}”
                    </p>

                    <div className="rating mb-2 flex justify-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${index}`}
                          className="mask mask-star-2 bg-orange-400"
                          aria-label={`${i} star`}
                          checked={item.rating === i}
                          readOnly
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigasi */}
        <div className="mt-[60px] flex items-center justify-center gap-10">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white transition"
            aria-label="Sebelumnya"
          >
            <BiLeftArrowAlt className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white transition"
            aria-label="Berikutnya"
          >
            <BiRightArrowAlt className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
