import React from 'react';
import PieRadialChart from './PieRadialChart';

const ResponsivePieRadialChart = (props) => {
  const { data, prefixLegend, innerRadius, linkPage, donorGroupJson, outerRadius, height } = props;
  return (
    <div style={{height: height}}>
      <PieRadialChart data={data} prefixLegend={prefixLegend} innerRadius={innerRadius} outerRadius={outerRadius}
                      linkPage={linkPage} donorGroupJson={donorGroupJson} />
    </div>
  )
};

export default ResponsivePieRadialChart;