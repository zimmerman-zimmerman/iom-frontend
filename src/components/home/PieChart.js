import React, { Component } from 'react';
import { Pie } from 'ant-design-pro/lib/Charts';

import '../../styles/home/PieChart.css';

class PieChart extends Component {
  render() {
    const {title, data, height} = this.props;
    return (
      <div className="PieChart">
        <h4 className="Title">{title}</h4>
        <Pie hasLegend={true}
             data={data}
             valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
             height={height}
        />
      </div>
    )
  }
}

export default PieChart;