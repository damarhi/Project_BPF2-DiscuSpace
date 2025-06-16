import axios from "axios";

const API_URL = "https://pwrvqulbuwjeswbesuei.supabase.co/rest/v1/like";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cnZxdWxidXdqZXN3YmVzdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjc0NzcsImV4cCI6MjA2NTIwMzQ3N30.IJHRmbLRf50zy9GjKe-suvyhIHOreccl5VRVyKuXWjE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const likeAPI = {
  async fetchLike() {
    const response = await axios.get(`${API_URL}?select=*`, { headers });
    return response.data;
  },

  async createLike(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteLike(id_like) {
    await axios.delete(`${API_URL}?id_like=eq.${id_like}`, { headers });
  },

  async updateLike(id_like, data) {
    const response = await axios.patch(
      `${API_URL}?id_like=eq.${id_like}`,
      data,
      { headers }
    );
    return response.data;
  },
};
