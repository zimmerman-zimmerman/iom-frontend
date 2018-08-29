import React from 'react';
import PieRadialChart from './PieRadialChart';

const ResponsivePieRadialChart = (props) => {
  const { data, prefixLegend, innerRadius } = props;
  return (
    <div style={{height: 400}}>
      <PieRadialChart data={data} prefixLegend={prefixLegend} innerRadius={innerRadius} />
    </div>
  )
};

export default ResponsivePieRadialChart;