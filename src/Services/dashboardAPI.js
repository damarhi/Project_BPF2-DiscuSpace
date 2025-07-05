// Services/dashboardAPI.js
import axios from "axios";

const BASE_URL = "https://pwrvqulbuwjeswbesuei.supabase.co/rest/v1";
const API_KEY =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cnZxdWxidXdqZXN3YmVzdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjc0NzcsImV4cCI6MjA2NTIwMzQ3N30.IJHRmbLRf50zy9GjKe-suvyhIHOreccl5VRVyKuXWjE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const fetchCount = async (endpoint) => {
  const res = await axios.get(`${BASE_URL}/${endpoint}?select=id`, {
    headers,
  });
  return res.data.length;
};

export const dashboardAPI = {
  getTotalData: async () => {
    const [user, postingan, laporan, komentar, like, dibagikan] =
      await Promise.all([
        fetchCount("user"),
        fetchCount("postingan"),
        fetchCount("laporan"),
        fetchCount("komentar"),
        fetchCount("like"),
        fetchCount("dibagikan"),
      ]);

    return { user, postingan, laporan, komentar, like, dibagikan };
  },
};
