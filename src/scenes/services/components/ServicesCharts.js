import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormattedMessage } from "react-intl";

import { format } from "d3-format";
import get from "lodash/get";
import Layout from 'antd/es/layout';
import Card from 'antd/es/card';

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = get(props, 'payload[0].payload');
  return data ?
    <Card>
      <Content>
        <h5>
          <FormattedMessage id="currency.usd" defaultMessage="USD"/> {format(",.2f")(data.value)}
        </h5>
      </Content>
    </Card> : null;
};

class ServicesCharts extends Component {
  render() {
    const { data }  =  this.props;
    return (
      <ResponsiveContainer width='100%' aspect={16.0/9.0}>
        { data !== null ?
          <BarChart width={600} height={300} data={data} maxBarSize={50}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="sector.name"/>
            <YAxis/>
            <Tooltip content={<CustomToolTip/>}/>
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#1f4283" />
          </BarChart>
          : <div></div>
        }
      </ResponsiveContainer>
    );
  }
}

export default ServicesCharts;