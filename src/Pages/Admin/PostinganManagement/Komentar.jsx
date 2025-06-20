import { useEffect, useState } from "react";
import { komentarAPI } from "../../../Services/komentarAPI";
import { userAPI } from "../../../Services/userAPI";
import Pagination from "../../../components/pagination";
import { FiTrash2 } from "react-icons/fi";

export default function Komentar({ open, onClose, id_postingan, judul }) {
  const [komentarList, setKomentarList] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchKomentar = async () => {
      if (!id_postingan) return;

      try {
        const [komentarData, usersData] = await Promise.all([
          komentarAPI.fetchKomentar(),
          userAPI.fetchUser(),
        ]);

        const filteredKomentar = komentarData
          .filter((k) => k.id_postingan === id_postingan)
          .map((k) => {
            const user = usersData.find((u) => u.id_user === k.id_user);
            return {
              ...k,
              user: user || {},
            };
          });

        setKomentarList(filteredKomentar);
      } catch (err) {
        console.error("Gagal mengambil komentar:", err);
      }
    };

    if (open) fetchKomentar();
  }, [open, id_postingan]);

  const handleDeleteKomentar = async (id_komentar) => {
    const konfirmasi = confirm("Yakin ingin menghapus komentar ini?");
    if (!konfirmasi) return;

    try {
      setLoadingDelete(true);
      await komentarAPI.deleteKomentar(id_komentar);
      setKomentarList((prev) => prev.filter((item) => item.id_komentar !== id_komentar));
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  if (!open) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-3xl">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-1">
          Pengguna Yang Mengomentari Postingan:{" "}
          <span className="text-blue-600">{judul}</span>
        </h3>

        {komentarList.length === 0 ? (
          <p className="text-sm text-gray-500 mt-4">
            Belum ada komentar pada postingan ini.
          </p>
        ) : (
          <Pagination
            data={komentarList}
            itemsPerPage={10}
            render={(currentItems) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {currentItems.map((item, index) => (
                  <div
                    key={item.id_komentar || index}
                    className="relative flex items-start space-x-4 px-4 py-2 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 transition"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src={
                        item.user.profile?.startsWith("data:image")
                          ? item.user.profile
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              item.user.nama || "User"
                            )}&background=eee&color=555`
                      }
                      alt={item.user.nama}
                    />
                    <div className="text-sm flex-1">
                      <div className="font-semibold text-gray-800">
                        {item.user.nama || "Tanpa Nama"}
                      </div>
                      <div className="text-xs uppercase text-gray-500 mb-1">
                        @{item.user.username}
                      </div>
                      <div className="text-gray-700 whitespace-pre-line">
                        {item.isi_komentar}
                      </div>
                    </div>
                    <button
                      title="Hapus komentar"
                      className="text-gray-400 hover:text-red-600 absolute top-2 right-2"
                      onClick={() => handleDeleteKomentar(item.id_komentar)}
                      disabled={loadingDelete}
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          />
        )}
      </div>
    </dialog>
  );
}
