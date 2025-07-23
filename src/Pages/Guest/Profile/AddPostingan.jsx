import { useState } from "react";
import postinganAPI from "@/api/postinganAPI"; 
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertBox } from "@/components/shared/AlertBox";

const AddPostingan = ({ onSuccess }) => {
  const { user } = useUserContext();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(""); // bisa URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = {
      judul,
      deskripsi,
      kategori,
      gambar,
      id_user: user?.id, // pastikan ini sesuai struktur user kamu
    };

    try {
      await postinganAPI.createPostingan(data);
      setSuccess("Postingan berhasil ditambahkan!");
      setJudul("");
      setDeskripsi("");
      setKategori("");
      setGambar("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Gagal menambahkan postingan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Tambah Postingan</h2>

      {error && <AlertBox variant="error">{error}</AlertBox>}
      {success && <AlertBox variant="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />
        <Textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
        />
        <Input
          placeholder="Kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
        />
        <Input
          placeholder="URL Gambar"
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Menyimpan..." : "Tambah Postingan"}
        </Button>
      </form>
    </div>
  );
};

export default AddPostingan;
