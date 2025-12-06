import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function GenderDonutChart({ data }) {
  const COLORS = ["#38b6ff", "#ff7f7f", "#fec636"];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="gender"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={5}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
