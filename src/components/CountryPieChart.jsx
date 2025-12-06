import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CountryPieChart({ data }) {
  const COLORS = [
    "#3182ce",
    "#ff3131",
    "#00bf63",
    "#ed8936",
    "#38b6ff",
    "#a0aec0",
    "#f6ad55",
    "#9b5de5",
    "#f15bb5",
    "#fee440",
  ];

  const countryCounts = data.reduce((acc, item) => {
    let country;

    if (item.country && item.count !== undefined) {
      country = item.country.trim();
      acc[country] = (acc[country] || 0) + item.count;
    }
    else if (item.location?.country) {
      country = item.location.country.trim();
      acc[country] = (acc[country] || 0) + 1;
    }

    return acc;
  }, {});

  const chartData = Object.entries(countryCounts).map(([country, count]) => ({
    country,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="country"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
