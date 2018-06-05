import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class ServicesCharts extends Component {

  render() {
    const { data }  =  this.props;
    return (
      <ResponsiveContainer width='100%' aspect={16.0/9.0}>
        { data !== null ?
          <BarChart width={600} height={300} data={data}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="sector.name"/>
            <YAxis/>
            <Tooltip/>
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