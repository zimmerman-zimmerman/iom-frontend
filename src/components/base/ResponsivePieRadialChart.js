import React from 'react';
import PieRadialChart from './PieRadialChart';

const ResponsivePieRadialChart = (props) => {
  const { data, prefixLegend, innerRadius, linkPage, donorGroupJson } = props;
  return (
    <div style={{height: props.respoHeight}}>
      <PieRadialChart data={data} prefixLegend={prefixLegend} innerRadius={innerRadius} linkPage={linkPage} donorGroupJson={donorGroupJson} />
    </div>
  )
};

export default ResponsivePieRadialChart;