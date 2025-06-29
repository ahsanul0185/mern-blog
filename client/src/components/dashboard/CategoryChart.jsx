import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9883E5"];

const CategoryChart = ({ chartData }) => {
  console.log(chartData);

  return (
   <div>
    <h2 className="font-semibold">Category Insights</h2>
     <div className="flex items-center">
        <ResponsiveContainer width={"60%"} height={400} className="">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="posts"
          nameKey="category"
          innerRadius={100}
          paddingAngle={5}
          outerRadius={120}
        >

          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>
        <Tooltip />
      </PieChart>
      </ResponsiveContainer>
            <div className="flex flex-col items-start flex-wrap gap-4 justify-center">
        {chartData.sort((a, b) => b.posts - a.posts).map((entry, idx) => <div key={idx} className="flex items-center gap-2">
          <div className="size-2 rounded-full" style={{backgroundColor : `${COLORS[idx % COLORS.length]}`}}/>
          <div  style={{ fontSize: `${Math.max(12, Math.min(18, (chartData.length - idx + 6) * 1.7))}px` }}>{entry.category}</div>
        </div>)}
      </div>
    </div>
   </div>
  );
};

export default CategoryChart;

