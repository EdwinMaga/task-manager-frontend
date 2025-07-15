import axios from "axios";

// URL base del backend
const API = axios.create({
  baseURL: "https://task-manager-api-bnps.onrender.com",
});

// Incluir token automáticamente si existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  API.post(
    "/users/login",
    new URLSearchParams({ username: email, password }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

export const register = (email, password) =>
  API.post("/users/register", { email, password });

export const fetchTasks = () => API.get("/tasks");

export const createTask = (task) => API.post("/tasks", task);

export const markTaskDone = (id) =>
  API.patch(`/tasks/${id}/done`, {});

export const deleteTasks = (id) =>
  API.delete(`/tasks/${id}`);
