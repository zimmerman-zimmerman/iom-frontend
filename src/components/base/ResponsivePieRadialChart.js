import React from 'react';
import PieRadialChart from './PieRadialChart';
import injectSheet from "react-jss";

const ResponsivePieRadialChart = (props) => {
  const { data, prefixLegend, innerRadius, linkPage, donorGroupJson, outerRadius, height, classes } = props;
  return (
    <div style={{height: height}} className={classes.chart}>
      <PieRadialChart data={data} prefixLegend={prefixLegend} innerRadius={innerRadius} outerRadius={outerRadius}
                      linkPage={linkPage} donorGroupJson={donorGroupJson}/>
    </div>
  )
};

const styles = {
    chart: {
        marginTop: 30,
        marginBottom: 60,
        '@media only screen and (max-width: 767px)': {
            marginTop: 0,
            marginBottom: 0,
        },
    }
};

export default injectSheet(styles)(ResponsivePieRadialChart);