import { RiFileWarningFill } from "react-icons/ri";
import { FaTelegramPlane, FaCommentAlt } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IoDocuments } from "react-icons/io5";
import { MdPerson } from "react-icons/md";

import { userAPI } from "../../Services/userAPI";
import { postinganAPI } from "../../Services/postinganAPI";
import { komentarAPI } from "../../Services/komentarAPI";
import { likeAPI } from "../../Services/likeAPI";
import { dibagikanAPI } from "../../Services/dibagikanAPI";
import { laporanAPI } from "../../Services/laporanAPI";
import { testimoniAPI } from "../../Services/testimoniAPI";

import Widget from "../../components/admin/Widget";
import Header from "../../components/admin/Header";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

export default function Dashboard() {
  const { onOpenSidenav } = useOutletContext();

  const [data, setData] = useState({
    user: 0,
    postingan: 0,
    komentar: 0,
    like: 0,
    dibagikan: 0,
    laporan: 0,
  });

  const [userStatusData, setUserStatusData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        user,
        postingan,
        komentar,
        like,
        dibagikan,
        laporan,
        testimoni,
      ] = await Promise.all([
        userAPI.fetchUser(),
        postinganAPI.fetchPostingan(),
        komentarAPI.fetchKomentar(),
        likeAPI.fetchLike(),
        dibagikanAPI.fetchDibagikan(),
        laporanAPI.fetchLaporan(),
        testimoniAPI.fetchTestimoni(),
      ]);

      const aktif = user.filter((u) => u.status === "aktif").length;
      const nonaktif = user.filter((u) => u.status === "nonaktif").length;

      setData({
        user: user.length,
        postingan: postingan.length,
        komentar: komentar.length,
        like: like.length,
        dibagikan: dibagikan.length,
        laporan: laporan.length,
      });

      setUserStatusData([
        { name: "Aktif", value: aktif },
        { name: "Diblokir", value: nonaktif },
      ]);

      const userGrowth = {};
      user.forEach((u) => {
        const date = new Date(u.created_at).toLocaleDateString("en-CA");
        userGrowth[date] = (userGrowth[date] || 0) + 1;
      });

      const userGrowthArray = Object.entries(userGrowth)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setUserGrowthData(userGrowthArray);

      const ratingCount = [1, 2, 3, 4, 5].map((r) => ({
        rating: `${r} ★`,
        count: testimoni.filter((t) => t.rating === r).length,
      }));

      setRatingData(ratingCount);
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow text-sm text-gray-700">
          <p className="font-semibold">{label}</p>
          <p>{payload[0].value} Pengguna Bertambah</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-4">
      <Header brandText="dashboard" title="Dashboard Overview" onOpenSidenav={onOpenSidenav} />
      <div className="p-3">
        {/* Widget Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
          <Widget icon={<MdPerson />} title="Pengguna" subtitle={data.user} />
          <Widget icon={<IoDocuments />} title="Postingan" subtitle={data.postingan} />
          <Widget icon={<FaCommentAlt />} title="Komentar" subtitle={data.komentar} />
          <Widget icon={<AiFillHeart />} title="Like" subtitle={data.like} />
          <Widget icon={<FaTelegramPlane />} title="Dibagikan" subtitle={data.dibagikan} />
          <Widget icon={<RiFileWarningFill />} title="Laporan" subtitle={data.laporan} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-gray-700 font-semibold text-sm mb-4">
              Status Pengguna (Aktif vs Nonaktif)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  <Cell fill="#2563EB" />
                  <Cell fill="#60A5FA" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: User Growth */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-gray-700 font-semibold text-sm mb-4">
              Pertumbuhan Pengguna Harian
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userGrowthData}>
                <XAxis dataKey="date" fontSize={10} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="url(#colorUv)" radius={[5, 5, 0, 0]} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rating Section */}
          <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
            <h3 className="text-gray-700 font-semibold text-sm mb-4">
              Jumlah Testimoni Berdasarkan Rating
            </h3>
            <div className="space-y-4">
              {ratingData.map((item, index) => {
                const maxCount = Math.max(...ratingData.map((r) => r.count)) || 1;
                const percentage = (item.count / maxCount) * 100;

                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center w-20 font-semibold text-blue-500 text-lg">
                      {item.rating}
                    </div>
                    <div className="flex-1 ml-4 bg-gray-200 rounded-full h-6 relative">
                      <div
                        className="bg-blue-400 h-6 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                      <span className="absolute right-2 top-[2px] text-sm font-semibold text-gray-700">
                        {item.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
