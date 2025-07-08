import { useNavigate } from "react-router-dom";

export default function Error({ gambar, deskripsi, jenis, jenis2 }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-600 relative overflow-hidden">
      <div className="absolute right-12 text-[250px] text-white font-extrabold opacity-50 [writing-mode:vertical-lr] leading-[0.8em]">
        {jenis2}
      </div>

      {/* Konten utama */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Teks */}
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-9xl font-bold text-white">Ooops...</h1>
          <h2 className="text-5xl font-medium text-white mt-4">{jenis}</h2>
          <p className="mt-4 text-2xl text-white">{deskripsi}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-lg"
          >
            Kembali
          </button>
        </div>

        {/* Gambar */}
        <div>
          <img src={gambar} alt="" className="w-150 h-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
