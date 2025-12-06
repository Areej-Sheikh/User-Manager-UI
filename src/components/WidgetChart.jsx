import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function WidgetChart({ data, dataKey, nameKey }) {  console.log("WidgetChart data:", data);
  const colors = [
    "#3182ce",
    "#fec636",
    "#ff3131",
    "#38b6ff",
    "#00bf63",
    "#ed8936",
  ];

  console.log("WidgetChart component loaded");

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No analytics data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey={nameKey} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey={dataKey}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={colors[index % colors.length] || "#8884d8"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}


WidgetChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  nameKey: PropTypes.string.isRequired,
};
