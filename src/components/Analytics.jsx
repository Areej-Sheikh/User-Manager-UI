import { useEffect, useState } from "react";
import { getAnalytics } from "../api/analytics";
import WidgetChart from "./WidgetChart";
import CountryPieChart from "./CountryPieChart";
import StateLineChart from "./StateLineChart";
import GenderDonutChart from "./GenderDonutChart";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("[Analytics] Component mounted");
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      console.log("[Analytics] Calling getAnalytics()...");
      const data = await getAnalytics();
      console.log("[Analytics] Data received:", data);
      setAnalytics(data);
    } catch (err) {
      console.error("[Analytics] Error:", err);
      setError("Failed to load analytics.");
    } finally {
      setLoading(false);
      console.log("[Analytics] Finished loading.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading analytics...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const usersByCity = analytics?.usersByCity?.length
    ? analytics.usersByCity
    : [
        { city: "Delhi", count: 12 },
        { city: "Mumbai", count: 9 },
        { city: "Bangalore", count: 6 },
      ];

  const usersByMonth = analytics?.usersByMonth?.length
    ? analytics.usersByMonth
    : [
        { month: "Jan", total: 20 },
        { month: "Feb", total: 35 },
        { month: "Mar", total: 28 },
      ];

  const totalUsers = analytics?.totalUsers ?? 0;
  const uniqueCities = usersByCity.length;

  // Aggregate countries to combine duplicates
  const aggregatedUsersByCountry = (analytics?.usersByCountry ?? []).reduce(
    (acc, item) => {
      const country = item.country?.trim() || "Unknown";
      acc[country] = (acc[country] || 0) + (item.count || 1);
      return acc;
    },
    {}
  );
  const usersByCountryChartData = Object.entries(aggregatedUsersByCountry).map(
    ([country, count]) => ({ country, count })
  );

  // Aggregate states to combine duplicates
  const aggregatedUsersByState = (analytics?.usersByState ?? []).reduce(
    (acc, item) => {
      const state = item.state?.trim() || "Unknown";
      acc[state] = (acc[state] || 0) + (item.count || 1);
      return acc;
    },
    {}
  );
  const usersByStateChartData = Object.entries(aggregatedUsersByState).map(
    ([state, count]) => ({ state, count })
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-xl font-bold">{totalUsers}</p>
          <p className="text-gray-600">Total Users</p>
        </div>

        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-xl font-bold">{uniqueCities}</p>
          <p className="text-gray-600">Cities Covered</p>
        </div>

        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-xl font-bold">
            {analytics?.notificationsSent ?? 0}
          </p>
          <p className="text-gray-600">Notifications Sent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Users By City</h2>
          <WidgetChart data={usersByCity} dataKey="count" nameKey="city" />
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Users By Country</h2>
          <CountryPieChart data={usersByCountryChartData} />
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Users By State</h2>
          <StateLineChart data={usersByStateChartData} />
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Gender Distribution</h2>
          <GenderDonutChart data={analytics?.usersByGender ?? []} />
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">New Users Per Month</h2>
          <WidgetChart data={usersByMonth} dataKey="total" nameKey="month" />
        </div>
      </div>
    </div>
  );
}
