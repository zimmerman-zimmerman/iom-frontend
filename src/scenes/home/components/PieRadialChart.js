import React from 'react';
import ResponsivePieRadialChart from '../../../containers/ResponsivePieRadialChart';

const PieRadialChart = (props) => {
  const { widthDivider, data, prefixLegend, fillColor, colors } = props;
  const height = window.innerWidth / widthDivider;
  return (
    <ResponsivePieRadialChart height={height} data={data} prefixLegend={prefixLegend} fillColor={fillColor}
                              innerRadius={height / 3.7} colors={colors}
    />
  )
};

export default PieRadialChart;