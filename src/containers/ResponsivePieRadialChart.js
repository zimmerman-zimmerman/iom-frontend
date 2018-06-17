import React from 'react';
import PieRadialChart from '../components/PieRadialChart';

const ResponsivePieRadialChart = (props) => {
  const { height, data, prefixLegend, fillColor, innerRadius, colors } = props;
  return (
    <div style={{height: height}}>
      <PieRadialChart data={data} prefixLegend={prefixLegend} fillColor={fillColor} innerRadius={innerRadius}
                      colors={colors}
      />
    </div>
  )
};

export default ResponsivePieRadialChart;