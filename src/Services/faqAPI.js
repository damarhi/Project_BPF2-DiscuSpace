import axios from "axios";

const API_URL = "https://pwrvqulbuwjeswbesuei.supabase.co/rest/v1/faq";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cnZxdWxidXdqZXN3YmVzdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjc0NzcsImV4cCI6MjA2NTIwMzQ3N30.IJHRmbLRf50zy9GjKe-suvyhIHOreccl5VRVyKuXWjE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const faqAPI = {
  async fetchFaq() {
    const response = await axios.get(`${API_URL}?select=*`, { headers });
    return response.data;
  },

  async createFaq(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteFaq(id_faq) {
    await axios.delete(`${API_URL}?id_faq=eq.${id_faq}`, { headers });
  },

  async updateFaq(id_faq, data) {
    const response = await axios.patch(
      `${API_URL}?id_faq=eq.${id_faq}`,
      data,
      { headers }
    );
    return response.data;
  },
};
