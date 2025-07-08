import axios from "axios";

const API_URL = "https://pwrvqulbuwjeswbesuei.supabase.co/rest/v1/testimoni";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cnZxdWxidXdqZXN3YmVzdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjc0NzcsImV4cCI6MjA2NTIwMzQ3N30.IJHRmbLRf50zy9GjKe-suvyhIHOreccl5VRVyKuXWjE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const testimoniAPI = {
  async fetchTestimoni() {
    const response = await axios.get(`${API_URL}?select=*`, { headers });
    return response.data;
  },

  async createTestimoni(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteTestimoni(id_testimoni) {
    await axios.delete(`${API_URL}?id_testimoni=eq.${id_testimoni}`, { headers });
  },

  async updateTestimoni(id_testimoni, data) {
    const response = await axios.patch(
      `${API_URL}?id_testimoni=eq.${id_testimoni}`,
      data,
      { headers }
    );
    return response.data;
  },
};
