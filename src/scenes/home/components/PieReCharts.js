import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import d3 from "d3";
import _ from "lodash";
import { Card, Layout } from 'antd';

import '../styles/PieReCharts.scss';

const { Content } = Layout;

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = _.get(props, 'payload[0].payload');
  const total = data ? _.sumBy(_.get(props, 'content._self.props.data'), 'value') : null;
  const percent = data ? parseFloat(data.value / total * 100).toFixed(2) : null;
  const textPercent = data ? percent.toString().concat('%') : null;
  return data ?
    <Card style={{width: 250}}>
      <Content>
        <h5>{data.name}</h5>
        <h5>{d3.format(",.2f")(data.value)}</h5>
        <h5>({textPercent} of {d3.format(",.2f")(total)})</h5>
      </Content>
    </Card> : null;
};

class PieReCharts extends Component {

  render() {
    const { title, data } = this.props;
    const COLORS = ['#0033a1', '#f29d70', '#fac878', '#f27f6d', '#54c8c3'];
    return(
      <Content className="PieReCharts">
        <h4 className="Title">{title}</h4>
        <ResponsiveContainer width="95%" height={170}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
            </Pie>
            <Tooltip content={<CustomToolTip/>}/>
          </PieChart>
        </ResponsiveContainer>
        <ul>
          {data.map((entry, index) => <li key={index}>
            <div className="dot" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
            <div className="name">{entry.name}</div>
          </li>)}
        </ul>
      </Content>
    )
  }
}

export default PieReCharts;