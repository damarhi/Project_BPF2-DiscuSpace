import axios from "axios";

const API_URL = "https://pwrvqulbuwjeswbesuei.supabase.co/rest/v1/user";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cnZxdWxidXdqZXN3YmVzdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjc0NzcsImV4cCI6MjA2NTIwMzQ3N30.IJHRmbLRf50zy9GjKe-suvyhIHOreccl5VRVyKuXWjE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  async fetchUser() {
    const response = await axios.get(`${API_URL}?select=*`, { headers });
    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteUser(id_user) {
    await axios.delete(`${API_URL}?id_user=eq.${id_user}`, { headers });
  },

  async updateUser(id_user, data) {
    const response = await axios.patch(
      `${API_URL}?id_user=eq.${id_user}`,
      data,
      { headers }
    );
    return response.data;
  },
};
