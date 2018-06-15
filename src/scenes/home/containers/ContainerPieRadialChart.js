import React from 'react';
import PieRadialChart from '../../../components/PieRadialChart';

const ContainerPieRadialChart = (props) => {
  const { height, data, prefix, fillColor, innerRadius, colors } = props;
  return (
    <div style={{height: height}}>
      <PieRadialChart data={data} prefix={prefix} fillColor={fillColor} innerRadius={innerRadius} colors={colors}/>
    </div>
  )
};

export default ContainerPieRadialChart;