import { useEffect, useState } from "react";
import { likeAPI } from "../../../Services/likeAPI";
import { userAPI } from "../../../Services/userAPI";
import Pagination from "../../../components/pagination";
export default function Like({ open, onClose, judul, id_postingan }) {
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!id_postingan) return;

      try {
        const [likes, users] = await Promise.all([
          likeAPI.fetchLike(),
          userAPI.fetchUser(),
        ]);

        const filteredLikes = likes.filter((l) => l.id_postingan === id_postingan);
        const likedUserList = filteredLikes.map((like) => {
          const user = users.find((u) => u.id_user === like.id_user);
          return {
            ...user,
            catatan: like.catatan || "Tidak ada keterangan",
          };
        });

        setLikedUsers(likedUserList);
      } catch (error) {
        console.error("Gagal mengambil data like:", error);
      }
    };

    if (open) {
      fetchLikes();
    }
  }, [open, id_postingan]);

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
         <h3 className="font-bold text-lg mb-1">Pengguna Yang Menyukai Postingan: <span className="text-blue-600">{judul}</span></h3>

        {likedUsers.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada pengguna yang menyukai postingan ini.
          </p>
        ) : (
          <Pagination
            data={likedUsers}
            itemsPerPage={10}
            render={(currentItems) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {currentItems.map((user, index) => (
                  <div
                    key={user.id_user || index}
                    className="flex items-center space-x-4 px-4 py-2 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 transition"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        user.profile?.startsWith("data:image")
                          ? user.profile
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama || "User")}&background=eee&color=555`
                      }
                      alt={user.nama}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{user.nama || "Tanpa Nama"}</div>
                      <div className="text-xs uppercase text-gray-500">
                        @{user.username}
                      </div>
                    </div>
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
