import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StateLineChart({ data }) {
  const stateCounts = data.reduce((acc, item) => {
    const state = item.state?.trim() || "Unknown";
    acc[state] = (acc[state] || 0) + (item.count || 1); 
    return acc;
  }, {});

  const chartData = Object.entries(stateCounts).map(([state, count]) => ({
    state,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#3182ce"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
