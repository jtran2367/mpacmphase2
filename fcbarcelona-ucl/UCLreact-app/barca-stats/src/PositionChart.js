// PositionChart.js
// This component receives averages data and draws a bar chart
// comparing FC Barcelona vs other teams for a given position

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// This component receives two props:
// - position: e.g. "Attacker"
// - averages: the averages object for that position from results.json
function PositionChart({ position, averages }) {

  // averages looks like this:
  // {
  //   barcelona:  { Goals: 3.5, Shots: 14.2, ShotsOnTarget: 7.1 },
  //   otherTeams: { Goals: 5.0, Shots: 20.0, ShotsOnTarget: 9.0 }
  // }

  // Recharts needs data in this format:
  // [
  //   { stat: 'Goals',         Barcelona: 3.5, 'Other Teams': 5.0 },
  //   { stat: 'Shots',         Barcelona: 14.2, 'Other Teams': 20.0 },
  //   { stat: 'ShotsOnTarget', Barcelona: 7.1,  'Other Teams': 9.0 }
  // ]

  // So we convert the averages object into that format
  const chartData = Object.keys(averages.barcelona).map(stat => ({
    stat: stat,
    'Barcelona': averages.barcelona[stat],
    'Other Teams': averages.otherTeams[stat]
  }));

  return (
    <div className="chart-container">
      <h4 className="chart-title">Average Stats — {position}s</h4>

      {/* ResponsiveContainer makes the chart fill its parent width */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          {/* CartesianGrid draws the background grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

          {/* XAxis shows the stat names along the bottom */}
          <XAxis
            dataKey="stat"
            tick={{ fontSize: 12, fill: '#555' }}
          />

          {/* YAxis shows the numbers on the left side */}
          <YAxis tick={{ fontSize: 12, fill: '#555' }} />

          {/* Tooltip shows values when you hover over a bar */}
          <Tooltip />

          {/* Legend shows which color is Barcelona and which is Other Teams */}
          <Legend />

          {/* One Bar for Barcelona, one for Other Teams */}
          <Bar dataKey="Barcelona"   fill="#a50044" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Other Teams" fill="#1a4fa0" radius={[4, 4, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PositionChart;