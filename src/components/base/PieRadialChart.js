import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import {format} from "d3-format";
import get from "lodash/get";
import Card from 'antd/es/card';

import { pieRadialChart as style } from "../../helpers/style";

const PieRadialChart = (props) => {
  const {data, prefixLegend, innerRadius} = props;
  const CustomToolTip = (props) => {
    const data = get(props, 'payload[0].payload');
    return data ?
      <Card className="transparent-white">
        <span className="value">{prefixLegend} {format(",.2f")(data.value)}</span>
      </Card> : null;
  };
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          outerRadius={innerRadius + 35}
          innerRadius={innerRadius}
          fill={style.fillColor}
          dataKey="value"
        >
          {data.map((entry, index) => <Cell fill={style.colors[index % style.colors.length]} key={index}/>)}
        </Pie>
        <Tooltip content={<CustomToolTip/>}/>
      </PieChart>
    </ResponsiveContainer>
  )
};

export default PieRadialChart;