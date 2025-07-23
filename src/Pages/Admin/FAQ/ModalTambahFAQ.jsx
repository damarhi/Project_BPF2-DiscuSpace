import { useState } from "react";
import { faqAPI } from "../../../Services/faqAPI";
import AlertBox from "../../../components/AlertBox";

export default function ModalTambahFAQ({ open, onClose, onSuccess }) {
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!pertanyaan || !jawaban) {
      setError("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    try {
      await faqAPI.createFaq({ pertanyaan, jawaban });
      onSuccess("FAQ berhasil ditambahkan.");
      onClose();
      setPertanyaan("");
      setJawaban("");
    } catch (err) {
      setError("Gagal menambahkan FAQ.");
    }
  };

  if (!open) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-xl">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-2">Tambah Pertanyaan Baru</h3>

        {error && <AlertBox type="error">{error}</AlertBox>}

        <div className="space-y-3 mt-2">
          <div>
            <label className="text-sm font-medium">Pertanyaan</label>
            <textarea
              className="w-full mt-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              value={pertanyaan}
              onChange={(e) => setPertanyaan(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Jawaban</label>
            <textarea
              className="w-full mt-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            type="button"
          >
            Simpan
          </button>
        </div>
      </div>
    </dialog>
  );
}
