import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { faqAPI } from "../../../Services/faqAPI";
import Header from "../../../components/admin/Header";
import Pagination from "../../../components/pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AlertBox from "../../../components/AlertBox";
import EmptyState from "../../../components/EmptyState";
import ModalEditFAQ from "./ModalEditFAQ";
import ModalTambahFAQ from "./ModalTambahFAQ";

export default function ListFAQ() {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await faqAPI.fetchFaq();
      setFaqList(data);
    } catch (err) {
      setError("Gagal memuat data FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (msg) => {
    setSuccess(msg);
    fetchData();
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus FAQ ini?");
    if (!konfirmasi) return;

    try {
      await faqAPI.deleteFaq(id);
      handleSuccess("FAQ berhasil dihapus.");
    } catch (err) {
      setError("Gagal menghapus FAQ.");
    }
  };

  const openEditModal = (faq) => {
    setSelectedFAQ(faq);
    setShowModalEdit(true);
  };

  return (
    <div className="mt-4">
      <Header brandText="FAQ" title="Pertanyaan Umum Pengguna" brandLink="/faq" />
      <div className="p-3 bg-[#f4f7fe] min-h-screen">
        <div className="rounded-xl bg-white p-4 shadow-sm">

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModalTambah(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
            >
              + Tambah FAQ
            </button>
          </div>

          {error && <AlertBox type="error">{error}</AlertBox>}
          {success && <AlertBox type="success">{success}</AlertBox>}

          {loading ? (
            <LoadingSpinner text="Memuat data FAQ..." />
          ) : faqList.length === 0 ? (
            <EmptyState text="Tidak ada data FAQ tersedia." />
          ) : (
            <Pagination
              data={faqList}
              itemsPerPage={6}
              render={(currentItems) => (
                <div className="space-y-4">
                  {currentItems.map((item) => (
                    <details
                      key={item.id_faq}
                      className="group border border-gray-200 bg-gray-50 rounded-md px-5 py-3 shadow-sm transition duration-200 open:shadow-md relative"
                    >
                      <summary className="text-lg font-semibold text-gray-800 cursor-pointer pr-10">
                        {item.pertanyaan}
                      </summary>

                      <div className="mt-2 text-sm text-gray-700 whitespace-pre-line pl-1">
                        {item.jawaban}
                      </div>

                      <div className="absolute top-3 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit FAQ"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id_faq)}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus FAQ"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            />
          )}
        </div>
      </div>

      <ModalTambahFAQ
        open={showModalTambah}
        onClose={() => setShowModalTambah(false)}
        onSuccess={handleSuccess}
      />

      <ModalEditFAQ
        open={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        onSuccess={handleSuccess}
        faq={selectedFAQ}
      />
    </div>
  );
}
