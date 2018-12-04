import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { name: 'Mon', Expenses: 2200, Orders: 3400 },
  { name: 'Tue', Expenses: 1280, Orders: 2398 },
  { name: 'Wed', Expenses: 5000, Orders: 4300 },
  { name: 'Thu', Expenses: 4780, Orders: 2908 },
  { name: 'Fri', Expenses: 5890, Orders: 4800 },
  { name: 'Sat', Expenses: 4390, Orders: 3800 },
  { name: 'Sun', Expenses: 4490, Orders: 4300 },
];

function LineGraph() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <AreaChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Expenses" stroke="#8884d8" fill="#8884d8" stackId="1" />
        <Area type="monotone" dataKey="Orders" stroke="#82ca9d" fill="#82ca9d" stackId="1" activeDot={{ r: 8 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;