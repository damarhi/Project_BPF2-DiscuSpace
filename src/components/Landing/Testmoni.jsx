import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { testimoniAPI } from "../../Services/testimoniAPI";
import { userAPI } from "../../Services/userAPI";

export default function Testimoni() {
  const [testimonials, setTestimonials] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <section id="testimonials" className="section-area py-16">
      <div className="container">
        <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
          <h6 className="mb-2 block text-lg font-semibold text-primary">
            Ulasan Pengguna
          </h6>
          <h2 className="mb-6 text-3xl font-bold">Testimoni Kami</h2>
          <p className="text-gray-600">
            Berikut adalah beberapa testimoni dari pengguna yang telah menggunakan platform DiscuSpace.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-carousel common-carousel scroll-revealed"
        >
          {testimonials.map((item, index) => {
            const { nama, username } = getUserInfo(item.id_user);

            return (
              <SwiperSlide key={item.id_testimoni}>
                <div className="rounded-xl bg-white px-5 py-8 shadow-md sm:px-8 h-full flex flex-col justify-between">
                  {/* Avatar + Info */}
                  <figure className="flex items-center gap-4 mb-4">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-200 flex items-center justify-center font-bold text-blue-500">
                      {nama?.charAt(0) || "U"}
                    </div>
                    <figcaption className="flex-grow">
                      <h3 className="text-sm font-semibold text-gray-800">{nama}</h3>
                      <p className="text-xs text-gray-500">
                        @{username} ·{" "}
                      </p>
                    </figcaption>
                  </figure>

                  {/* Isi Testimoni */}
                  <p className="mb-6 text-base text-gray-600">“{item.isi_testimoni}”</p>

                  {/* Bintang */}
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
