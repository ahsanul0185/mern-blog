import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useIsMobile } from "../../hooks/useIsMobile";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9883E5"];

const CategoryChart = ({ chartData }) => {

  const isMobile = useIsMobile(640);
    
  return (
   <div>
    <h2 className="text-[19px] font-semibold">Category Insights</h2>
     <div className="flex flex-col sm:flex-row items-center sm:gap-5">
        <ResponsiveContainer  width={isMobile ? "95%" : "60%"} height={isMobile ? 300 : 400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="posts"
          nameKey="category"
          innerRadius={isMobile ? 80 : 100}
          paddingAngle={5}
          outerRadius={isMobile ? 100 : 120}
   
        >

          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>
        <Tooltip />
      </PieChart>
      </ResponsiveContainer>
            <div className="flex flex-col items-center sm:items-start flex-wrap gap-4 justify-center">
{[...chartData]
  .sort((a, b) => b.posts - a.posts)
  .map((entry, idx) => (
    <div key={idx} className="flex items-center gap-2">
      <div
        className="size-2 rounded-full"
        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
      />
      <div
        style={{
          fontSize: `${Math.max(
            12,
            Math.min(18, (chartData.length - idx + 6) * 1.7)
          )}px`,
        }}
      >
        {entry.category}
      </div>
    </div>
))}

      </div>
    </div>
   </div>
  );
};

export default CategoryChart;

