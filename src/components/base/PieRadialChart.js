import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import {format} from "d3-format";
import get from "lodash/get";
import Card from 'antd/es/card';
import { withRouter } from 'react-router';

import { pieRadialChart as style } from "../../helpers/style";

const PieRadialChart = (props) => {
  const {data, prefixLegend, innerRadius, outerRadius, linkPage, donorGroupJson} = props;
  const CustomToolTip = (props) => {
    const data = get(props, 'payload[0].payload');
    return data ?
      <Card className="just-white">
        <span className="value">{prefixLegend} {format(",.0f")(data.value)}</span>
      </Card> : null;
  };
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill={style.fillColor}
          dataKey="value"
          onClick={(e) => {
            let donorExtra = '';
            if(linkPage === '/donors') {
              donorExtra = `${get(donorGroupJson.data.content, e.payload.id)}/`;
            }
            e.payload.id !== '-' ? props.history.push(`${linkPage}/${donorExtra}${e.payload.id}`) : null;
        }}
        >
          {data.map((entry, index) => <Cell fill={style.colors[index % style.colors.length]} key={index}/>)}
        </Pie>
        <Tooltip wrapperStyle={{opacity: "1"}} content={<CustomToolTip/>}/>
      </PieChart>
    </ResponsiveContainer>
  )
};

export default withRouter(PieRadialChart);