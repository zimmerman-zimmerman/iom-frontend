import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'recharts';
import sumBy from 'lodash/sumBy';
import {
    calcLabelSizePosition, calcPercFontSize, calcPercXPosition,
    calcPercYPosition
} from '../../donors/components/charts/DonorsTreeMapHelpers';

export default class SectorsTreeMapItem extends Component {
  static displayName = 'SectorsTreeMapItem';

    constructor(props) {
        super(props);
        this.state = {
            labelFontSize: 40,
            textArray: [],
        };
    }

    componentDidMount(){
        if(this.props.sector){
            let label = calcLabelSizePosition(this.props.sector.name, this.props.width, this.props.height);
            const labelFontSize = label.fontSize;
            const textArray = label.textArray;
            this.setState({
                labelFontSize,
                textArray,
            });
        }
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
    const { root, depth, x, y, width, height, index, bgColors, value } = this.props;
    const total = sumBy(root.children, 'value');
    const percent = parseFloat(value / total * 100).toFixed(2);
    //We need the percentage calculations to be done in the render
      // Because they need to be centered, horizontally
      // and this treemap still does some resizing/animations even though
      //  i've set it to NOT do it...
      const textPercent = percent.concat('%');
      const percFontSize = calcPercFontSize(textPercent+'', this.props.width, this.props.height);
      const percXPos = x + calcPercXPosition(textPercent+'', this.props.width, percFontSize);
      const percYPos = y + calcPercYPosition(height);
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
                  this.state.textArray.length > 0 && this.state.textArray.map(item => {
                      return (
                          <Text
                              x={x + 4}
                              y={y + item.yAdjust}
                              textAnchor="start"
                              fill={bgColors[index % 6] === '#e9ebf6' ? '#5287b7' : '#fff'}
                              stroke="none"
                              fillOpacity={1}
                              fontSize={this.state.labelFontSize}
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