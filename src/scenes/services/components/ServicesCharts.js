import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { injectIntl, intlShape } from "react-intl";
import { format } from "d3-format";
import get from "lodash/get";
import Layout from 'antd/es/layout';
import Card from 'antd/es/card';

import Trans from '../../../locales/Trans';

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = get(props, 'payload[0].payload');
  return data ?
    <Card>
      <Content>
        <h5>
          <Trans id="currency.usd" defaultMessage="USD"/> {format(",.0f")(data.value)}
        </h5>
      </Content>
    </Card> : null;
};

class ServicesCharts extends Component {
  render() {
    const { intl, data } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    return (
      <ResponsiveContainer width='100%' aspect={15.0/5.5}>
        {data !== null ?
          <BarChart width={600} height={300} data={data} maxBarSize={50}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="sector.code" tick={{ fontSize: 16, color: '#262626' }} />
            <YAxis
              axisLine={false}
              tickFormatter={value => {return `${usd}${format(",.0f")(value)}`}}
              tickSize={0}
              tick={{
                fontSize: 10, marginRight: 10, color: '#262626'
              }}
            />
            <Tooltip content={<CustomToolTip/>}/>
            <Legend verticalAlign="top" align="right" wrapperStyle={{ marginTop: -10 }}/>
            <Bar dataKey="value" stackId="a" fill="#1f4283" />
          </BarChart>
          : <div></div>
        }
      </ResponsiveContainer>
    );
  }
}

ServicesCharts.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ServicesCharts);