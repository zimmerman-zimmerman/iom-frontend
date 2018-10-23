import React from 'react';
import injectSheet from "react-jss";

const BarChartLegend = (props) => (
    <div className={props.classes.customLegend}>
        {
            props.payload.map((entry) => {
                return (
                <div className={props.classes.legend}>
                    <div className={props.classes.rect} style={{ backgroundColor: entry.color }}> </div>
                    <div className={props.classes.text}>{entry.value}</div>
                </div>
                )
            })
        }
    </div>
);

const styles = {
   customLegend: {
       width: 'fit-content',
       display: 'flex',
       marginLeft: 'auto',
   },
   rect: {
       width: 26,
       height: 12,
       margin: 'auto 10px auto 24px',
   },
    text: {
      fontSize: 12,
    },
    legend: {
       display: 'flex',
    },
};

export default injectSheet(styles)(BarChartLegend);