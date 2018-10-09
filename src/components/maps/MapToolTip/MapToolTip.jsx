import React from 'react';
import ReactCountryFlag from "react-country-flag";
import {format} from "d3-format";

const MapToolTip = props => (
    <div className="country-tooltip-container">
        <div>
            <span className="inline-block" style={{ fontSize: "25px", marginTop: "-10px" }}>
              <ReactCountryFlag code={props.code} svg />
            </span>
            <span className="inline-block">
              <h5>{props.name}</h5>
            </span>
        </div>
        <div style={{ marginTop: "10px" }}>
            <label>
                <b>Total budget:</b> US$ {format(",.0f")(props.budgetValue)}
            </label>
        </div>
    </div>
);

export default MapToolTip;