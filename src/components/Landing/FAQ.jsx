import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt, BiHelpCircle } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { faqAPI } from "../../Services/faqAPI";

const ITEMS_PER_PAGE = 4;

export default function FAQ() {
  const [faqData, setFaqData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(faqData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await faqAPI.fetchFaq();
        setFaqData(data);
      } catch (error) {
        console.error("Gagal mengambil data FAQ:", error);
      }
    };

    fetchData();
    AOS.init({ duration: 800, once: true });
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFaq = faqData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="faq" className="section-area relative bg-gray-100 w-full">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="text-center max-w-[550px] mx-auto mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-2 text-primary">
            <BiHelpCircle className="text-2xl" />
            <h6 className="block text-lg font-semibold">FAQ</h6>
          </div>
          <h2 className="mb-6 text-3xl font-bold">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-600">
            Di bawah ini adalah beberapa pertanyaan umum seputar platform DiscuSpace.
            Temukan jawaban sebelum Anda bertanya.
          </p>
        </div>

        {/* Daftar FAQ dengan animasi slide */}
        <div className="relative min-h-[300px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 100 : -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-x-8 gap-y-12 grid-cols-1 lg:grid-cols-2 absolute w-full"
            >
              {currentFaq.map((item, index) => (
                <div
                  key={item.id_faq || index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="scroll-revealed flex"
                >
                  <div className="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white text-[28px] sm:mr-6 sm:h-[60px] sm:max-w-[60px] sm:text-[32px]">
                    <BiHelpCircle />
                  </div>
                  <div className="w-full">
                    <h3 className="mb-4 text-xl font-semibold text-body-light-12 dark:text-body-dark-12 sm:text-2xl lg:text-xl xl:text-2xl">
                      {item.pertanyaan}
                    </h3>
                    <p className="text-body-light-11 dark:text-body-dark-11">
                      {item.jawaban}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigasi */}
        {faqData.length > ITEMS_PER_PAGE && (
          <div className="mt-[60px] flex items-center justify-center gap-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white transition"
              aria-label="Sebelumnya"
              disabled={currentPage === 1}
            >
              <BiLeftArrowAlt className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white transition"
              aria-label="Berikutnya"
              disabled={currentPage === totalPages}
            >
              <BiRightArrowAlt className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
