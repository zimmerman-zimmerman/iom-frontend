import React from 'react';
import PieRadialChart from './PieRadialChart';

const ResponsivePieRadialChart = (props) => {
  const { height, data, prefixLegend, innerRadius } = props;
  return (
    <div style={{height: height}}>
      <PieRadialChart data={data} prefixLegend={prefixLegend} innerRadius={innerRadius} />
    </div>
  )
};

export default ResponsivePieRadialChart;