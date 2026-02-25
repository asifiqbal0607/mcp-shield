import { PieChart, Pie, Cell } from 'recharts';
import { BLUE } from '../../constants/colors';

/**
 * TinyDonut — a compact 68×68 donut chart for channel cards.
 *
 * @param {number} pct    Filled percentage (0–100)
 * @param {string} color  Fill color for the active slice
 */
export default function TinyDonut({ pct = 25, color = BLUE }) {
  const data = [{ v: pct }, { v: 100 - pct }];

  return (
    <PieChart width={68} height={68}>
      <Pie
        data={data}
        dataKey="v"
        cx={30}
        cy={30}
        innerRadius={20}
        outerRadius={32}
        startAngle={90}
        endAngle={-270}
        paddingAngle={2}
        stroke="none"
      >
        <Cell fill={color} />
        <Cell fill="#e8ecf3" />
      </Pie>
    </PieChart>
  );
}
