import axios from "axios";

const API = "http://localhost:5000/api/users/analytics/dashboard";

export const getAnalytics = async () => {
  console.log("[API] Fetching analytics from:", API);
  const res = await axios.get(API);
  console.log("[API] Analytics received:", res.data);
  return res.data;
};
