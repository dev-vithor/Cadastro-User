import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000, // 10 segundos
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error("Erro na API:", error);
    alert("Ocorreu um erro ao se comunicar com o servidor.");
    return Promise.reject(error);
  }
);

export default api;
