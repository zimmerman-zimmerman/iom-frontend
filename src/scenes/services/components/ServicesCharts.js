import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { injectIntl, intlShape } from "react-intl";
import { format } from "d3-format";
import get from "lodash/get";
import Layout from 'antd/es/layout';
import Card from 'antd/es/card';

import { calcBarChartFont, calcBarChartYPos } from '../ServicesHelper';
import BarChartLegend from './BarChartLegend';

import Trans from '../../../locales/Trans';

import './ServicesCharts.scss';
import injectSheet from "react-jss";

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = get(props, 'payload[0].payload');
  return data ?
    <Card title={get(props, 'label', '')}>
      <Content>
        <h5 className={props.classes.tooltipHuman}>
          Humanitarian: <Trans id="currency.usd" defaultMessage="US$ "/> {format(",.0f")(data.value)}
        </h5>
        <h5 className={props.classes.tooltipNonhuman}>        
          Non-humanitarian: <Trans id="currency.usd" defaultMessage="US$ "/> {format(",.0f")(data.nonHumanValue)}
        </h5>
      </Content>
    </Card> : null;
};
const CustomizedTick = props => {
    const { x, y, payload } = props;
    const textArray = payload.value.split(' ');
    return (
        <svg>
            {textArray.map((word, index) => {
          return (
                <text
                x={x}
                y={y + calcBarChartYPos(props.serviceAmount) + index*calcBarChartYPos(props.serviceAmount)}
                textAnchor="middle"
                fill="#666"
                fontSize={calcBarChartFont(props.serviceAmount) + 'vw'}
                >
                  {word}
                </text>
          )
        })}
        </svg>
    )
};
class ServicesCharts extends Component {
  render() {
    const { intl, data, classes } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    let otherData = data;
      otherData.forEach(item => {
        item.otherValue = item.value*2;
    });
    return (
      <ResponsiveContainer width='100%' aspect={15.0/5.5}>
        {otherData !== null ?
          <BarChart data={otherData} maxBarSize={50} className={classes.barChart}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                    onClick={e => this.props.history.push(`/services/${e.activePayload[0].payload.sector.code}`)}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey='sector.name' interval={0} tick={false} />
            <YAxis
              axisLine={false}
              tickFormatter={value => {return `${usd}${format(",.0f")(value)}`}}
              tickSize={0}
              tick={{
                fontSize: 10, marginRight: 10, color: '#262626', whiteSpace: 'nowrap', width: '200',
              }}
            />
            <Tooltip wrapperStyle={{ opacity: '1' }} content={<CustomToolTip classes={classes} />} cursor={{ opacity: '0.1' }}/>
            <Legend verticalAlign="top" align="right" wrapperStyle={{ marginTop: -10 }}
                    payload={[{ value: 'Humanitarian', type: 'rect', id: 'a', color: '#418fde'},
                        { value: 'Non-humanitarian', type: 'rect', id: 'a', color: '#1f4283' },]}
                    content={<BarChartLegend/>}/>
            <Bar dataKey="value" stackId='a' fill="#418fde"/>
            <Bar dataKey="nonHumanValue" stackId='a' fill="#1f4283"/>
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

const styles = {
    barChart: {
        '& .recharts-legend-wrapper': {
            top: '0px !important',
            marginTop: '-20px !important',
        },
    },
    tooltipHuman: {
      color: '#418fde',
      fontSize: 14
    },
    tooltipNonhuman: {
      color: '#1f4283',
      fontSize: 14
    }
};

export default injectSheet(styles)(withRouter(injectIntl(ServicesCharts)));