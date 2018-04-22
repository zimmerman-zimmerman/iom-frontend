import React, { Component } from 'react';
import { Pie } from 'ant-design-pro/lib/Charts';

import '../styles/home/PieChart.css';

class PieChartHome extends Component {
  render() {
    const salesPieData = [
      {
        x: 'United State of America',
        y: 4544,
      },
      {
        x: 'Other member States',
        y: 3321,
      },
      {
        x: 'European Commission',
        y: 3113,
      },
      {
        x: 'United Nations Organization',
        y: 2341,
      },
      {
        x: 'UNESCO',
        y: 1231,
      },
      {
        x: 'Other Income',
        y: 1231,
      },
    ];
    const { title } = this.props;
    return (
      <div className="PieChart">
        <h4 className="Title">{title}</h4>
        <Pie hasLegend
             data={salesPieData}
             valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
             height={180}
        />
      </div>
    )
  }
}

export default PieChartHome;