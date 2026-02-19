import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// ---------- RESPONSE HANDLER ----------
const handle = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (err) {
    console.error("API Error:", err?.response || err.message);
    throw err.response?.data || { message: "Server error" };
  }
};

// ---------- QUIZ ----------
export const generateQuiz = (params) =>
  handle(API.get("/quiz", { params }));

// ---------- SUBMIT ----------
export const submitQuiz = (data) =>
  handle(API.post("/submit", data));

// ---------- HISTORY ----------
export const getAttempts = () =>
  handle(API.get("/attempts"));

export default API;
