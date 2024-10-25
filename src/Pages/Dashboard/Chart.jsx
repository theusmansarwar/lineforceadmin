
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css'


const VisitorsChart = () => {
  const visitorsData = [
    { day: "01", visitors: 145 },
    { day: "02", visitors: 132 },
    { day: "03", visitors: 160 },
    { day: "04", visitors: 178 },
    { day: "05", visitors: 154 },
    { day: "06", visitors: 165 },
    { day: "07", visitors: 149 },
    { day: "08", visitors: 171 },
    { day: "09", visitors: 134 },
    { day: "10", visitors: 188 },
    { day: "11", visitors: 142 },
    { day: "12", visitors: 167 },
    { day: "13", visitors: 175 },
    { day: "14", visitors: 156 },
    { day: "15", visitors: 185 },
    { day: "16", visitors: 160 },
    { day: "17", visitors: 177 },
    { day: "18", visitors: 143 },
    { day: "19", visitors: 190 },
    { day: "20", visitors: 158 },
    { day: "21", visitors: 166 },
    { day: "22", visitors: 180 },
    { day: "23", visitors: 150 },
    { day: "24", visitors: 174 },
    { day: "25", visitors: 162 },
    { day: "26", visitors: 181 },
    { day: "27", visitors: 140 },
    { day: "28", visitors: 172 },
    { day: "29", visitors: 165 },
    { day: "30", visitors: 186 },
];

console.log(visitorsData);

  return (
    <div className='chart-area'>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={visitorsData}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'No of Visitors', angle: -90, position: 'insideLeft' }}  />
        <Tooltip  />
        <Legend  />
        <Line type="monotone" dataKey="visitors" stroke="#004ab8"  />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
