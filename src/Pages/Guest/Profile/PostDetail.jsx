import { useParams, Link } from "react-router-dom";
import { useState } from "react";


const dummyPosts = [
  {
    id: 1,
    title: "Cara Membuat REST API dengan Laravel Sanctum",
    content:
      "Ini adalah penjelasan lengkap tentang membuat REST API dengan Laravel Sanctum. Kita akan bahas setup, middleware, dan penggunaan token secara aman.",
    tags: ["laravel", "api", "backend"],
    date: "7 Maret 2025",
    reactions: 120,
    comments: [
      { id: 1, name: "Dian", text: "Mantap tutorialnya!" },
      { id: 2, name: "Rizal", text: "Sangat membantu, terima kasih!" },
    ],
  },
  {
    id: 2,
    title: "Mengenal TailwindCSS untuk Pemula",
    content:
      "TailwindCSS adalah utility-first CSS framework yang sangat fleksibel dan cepat untuk membangun antarmuka. Kita bahas konsep, class, dan praktik terbaik.",
    tags: ["tailwind", "css", "frontend"],
    date: "12 Maret 2025",
    reactions: 85,
    comments: [],
  },
  {
    id: 3,
    title: "Tips Menjadi Junior Programmer yang Produktif",
    content:
      "Menjadi produktif sebagai programmer pemula itu penting. Mulailah dari mengatur waktu, konsisten belajar, dan jangan takut bertanya.",
    tags: ["karir", "tips", "pengembangan diri"],
    date: "20 Maret 2025",
    reactions: 200,
    comments: [{ id: 1, name: "Sarah", text: "Tipsnya bagus banget!" }],
  },
];


export default function PostDetail() {
  const { id } = useParams();
  const post = dummyPosts.find((p) => p.id === parseInt(id));
  const [likes, setLikes] = useState(post?.reactions || 0);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post?.comments || []);


  if (!post) {
    return (
      <div className="p-6 text-center text-red-500">
        Postingan tidak ditemukan.
      </div>
    );
  }


  const handleAddComment = () => {
    if (commentInput.trim() === "") return;


    const newComment = {
      id: comments.length + 1,
      name: "Pengunjung",
      text: commentInput.trim(),
    };


    setComments([...comments, newComment]);
    setCommentInput("");
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>


      <div className="text-sm text-gray-500 mb-4">
        {post.date} • {likes} Suka • {comments.length} Komentar
      </div>


      <div className="flex flex-wrap gap-2 text-sm text-blue-500 mb-4">
        {post.tags.map((tag, i) => (
          <span key={i}>#{tag}</span>
        ))}
      </div>


      <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>


      {/* Tombol Suka */}
      <div className="mb-6">
        <button
          onClick={() => setLikes(likes + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow transition"
        >
          Suka ({likes})
        </button>
      </div>


      {/* Komentar */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Komentar</h3>


        {comments.length > 0 ? (
          <ul className="space-y-3 mb-4">
            {comments.map((komentar) => (
              <li
                key={komentar.id}
                className="bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <strong>{komentar.name}</strong>
                <p className="text-gray-700">{komentar.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Belum ada komentar.</p>
        )}


        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Tulis komentar..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Kirim
          </button>
        </div>
      </div>


      {/* Kembali ke Profil */}
      <div className="flex justify-center mt-10">
        <Link
          to="/profile"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow transition"
        >
          Kembali ke Profil
        </Link>
      </div>
    </div>
  );
}





