import { useEffect, useState } from "react";
import { dibagikanAPI } from "../../../Services/dibagikanAPI";
import { userAPI } from "../../../Services/userAPI";
import Pagination from "../../../components/pagination";
import { FiTrash2 } from "react-icons/fi";

export default function Dibagikan({ open, onClose, id_postingan, judul }) {
  const [dibagikanList, setDibagikanList] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchDibagikan = async () => {
      if (!id_postingan) return;

      try {
        const [dibagikanData, usersData] = await Promise.all([
          dibagikanAPI.fetchDibagikan(),
          userAPI.fetchUser(),
        ]);

        const filteredDibagikan = dibagikanData
          .filter((d) => d.id_postingan === id_postingan)
          .map((d) => {
            const user = usersData.find((u) => u.id_user === d.id_user);
            return {
              ...d,
              user: user || {},
            };
          });

        setDibagikanList(filteredDibagikan);
      } catch (err) {
        console.error("Gagal mengambil data dibagikan:", err);
      }
    };

    if (open) fetchDibagikan();
  }, [open, id_postingan]);

  const handleDeleteDibagikan = async (id_dibagikan) => {
    const konfirmasi = confirm("Yakin ingin menghapus data dibagikan ini?");
    if (!konfirmasi) return;

    try {
      setLoadingDelete(true);
      await dibagikanAPI.deleteDibagikan(id_dibagikan);
      setDibagikanList((prev) => prev.filter((item) => item.id_dibagikan !== id_dibagikan));
    } catch (err) {
      console.error("Gagal menghapus data dibagikan:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  if (!open) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-3xl">
        <form method="dialog">
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-1">
          Pengguna Yang Membagikan Postingan: <span className="text-blue-600">{judul}</span>
        </h3>

        {dibagikanList.length === 0 ? (
          <p className="text-sm text-gray-500 mt-4">
            Belum ada pengguna yang membagikan postingan ini.
          </p>
        ) : (
          <Pagination
            data={dibagikanList}
            itemsPerPage={10}
            render={(currentItems) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {currentItems.map((item, index) => (
                  <div
                    key={item.id_dibagikan || index}
                    className="relative flex items-start space-x-4 px-4 py-2 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 transition"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src={
                        item.user.profile?.startsWith("data:image")
                          ? item.user.profile
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.nama || "User")}&background=eee&color=555`
                      }
                      alt={item.user.nama}
                    />
                    <div className="text-sm flex-1">
                      <div className="font-semibold text-gray-800">{item.user.nama || "Tanpa Nama"}</div>
                      <div className="text-xs uppercase text-gray-500 mb-1">@{item.user.username}</div>
                      <div className="text-gray-700 whitespace-pre-line">{item.caption || "Tidak ada keterangan"}</div>
                    </div>
                    <button
                      title="Hapus data dibagikan"
                      className="text-gray-400 hover:text-red-600 absolute top-2 right-2"
                      onClick={() => handleDeleteDibagikan(item.id_dibagikan)}
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
