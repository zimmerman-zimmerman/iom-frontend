import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'recharts';
import sumBy from 'lodash/sumBy';

import { calcPercFontSize, calcPercXPosition, calcPercYPosition, calcXPosition,
    calcLabelSizePosition } from './DonorsTreeMapHelpers';

export default class DonorsTreeMapItem extends Component {
  static displayName = 'DonorsTreeMapItem';

    constructor(props) {
        super(props);
        this.state = {
            labelFontSize: 40,
            textArray: [],
        };
    }

     componentDidMount(){
        let label = calcLabelSizePosition(this.props.name, this.props.width, this.props.height);
        const labelFontSize = label.fontSize;
        const textArray = label.textArray;
        this.setState({
            labelFontSize,
            textArray,
        });
     }

  static propTypes = {
    root: PropTypes.object,
    depth: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    index: PropTypes.number,
    payload: PropTypes.object,
    bgColors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {};

  render() {
    const { depth, x, y, width, height, index, bgColors } = this.props;

    const total = sumBy(this.props.root.children, 'value');
    const percent = parseFloat(this.props.value / total * 100).toFixed(2);
    //We need the percentage calculations to be done in the render
    // Because they need to be centered, horizontally
    // and this treemap still does some resizing/animations even though
    //  i've set it to NOT do it...
    const textPercent = percent.concat('%');
    const percFontSize = calcPercFontSize(textPercent+'', this.props.width, this.props.height);
    const percXPos = x + calcPercXPosition(textPercent+'', this.props.width, percFontSize);
    const percYPos = y + calcPercYPosition(height);
    // gonna use this to adjust that annoying first item, cause it don't stand right
    //  And doing more proper calculations is gonna take a lot of time
    //  I wait for the day we use them nivo charts for this.
    const defXAdjust = this.props.code === 'US' ? 20 : this.props.code === 'GB' ? 10 : 0;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={depth < 2 ? bgColors[index % 6] : "rgba(255,255,255,0)"}
          stroke="#fff"
          strokeWidth={2 / (depth + 1e-10)}
          strokeOpacity={1 / (depth + 1e-10)}
        />
          {
              depth === 1 ? (
                  this.state.textArray.length > 0 && this.state.textArray.map((item) => {
                      return (
                          <Text
                              x={x + item.xAdjust + defXAdjust}
                              y={y + item.yAdjust}
                              className={'lol'}
                              // textAnchor="start"
                              fill={bgColors[index % 6] === '#e9ebf6' ? '#5287b7' : '#fff'}
                              stroke="none"
                              fillOpacity={1}
                              fontSize={this.state.labelFontSize}
                              fontWeight={600}
                          >
                              {item.text}
                          </Text>
                      )
                  }))
                  : null
          }
        {
          depth === 1 ?
            <Text
                x={percXPos}
                y={percYPos}
                verticalAnchor="end"
              fill="#fff"
              fillOpacity={0.9}
              fontSize={percFontSize}
            >
                {textPercent}
            </Text>
            : null
        }
      </g>
    );
  }
}
