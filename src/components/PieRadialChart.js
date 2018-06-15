import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import {format} from "d3-format";
import get from "lodash/get";
import Card from 'antd/es/card';

const PieRadialChart = (props) => {
  const {data, colors, prefix, fillColor, innerRadius} = props;
  const CustomToolTip = (props) => {
    const data = get(props, 'payload[0].payload');
    return data ?
      <Card className="transparent-white">
        {prefix} {format(",.2f")(data.value)}
      </Card> : null;
  };
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          innerRadius={innerRadius}
          fill={fillColor}
          dataKey="value"
        >
          {data.map((entry, index) => <Cell fill={colors[index % colors.length]} key={index}/>)}
        </Pie>
        <Tooltip content={<CustomToolTip/>}/>
      </PieChart>
    </ResponsiveContainer>
  )
};

export default PieRadialChart;