import axios from "axios";

const API =
  "https://user-manager-api-n5dx.onrender.com/api/users/analytics/dashboard";


export const getAnalytics = async () => {
  console.log("[API] Fetching analytics from:", API);
  const res = await axios.get(API);
  console.log("[API] Analytics received:", res.data);
  return res.data;
};
