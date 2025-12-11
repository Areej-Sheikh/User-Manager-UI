import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://user-manager-api-n5dx.onrender.com/api",
});

console.log("Loaded API URL:", import.meta.env.VITE_API_URL);

API.interceptors.request.use(
  (req) => {
    console.log("[API] Request:", req.method, req.url, req.data || req.params);
    return req;
  },
  (err) => Promise.reject(err)
);

API.interceptors.response.use(
  (res) => {
    console.log("[API] Response:", res.status, res.config.url);
    return res;
  },
  (err) => {
    console.error("[API] Error:", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

export const fetchUsers = (params) => API.get("/users", { params });
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const notifyUsers = (payload) => API.post("/users/notify", payload);
export const getUser = (id) => API.get(`/users/${id}`);

export const getAnalytics = async () => {
  console.log("[API] Fetching analytics...");
  const res = await API.get("/users/analytics/users-by-location");
  console.log("[API] Analytics received:", res.data);
  return res.data;
};
