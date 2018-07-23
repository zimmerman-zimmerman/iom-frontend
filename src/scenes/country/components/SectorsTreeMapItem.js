import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'recharts';
import sumBy from 'lodash/sumBy';

export default class SectorsTreeMapItem extends Component {
  static displayName = 'SectorsTreeMapItem';

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
    const { root, depth, x, y, width, height, index, bgColors, sector, value } = this.props;
    const total = sumBy(root.children, 'value');
    const percent = parseFloat(value / total * 100).toFixed(2);
    const fontSize = percent.toString().concat('%')
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
          <Text
            x={x + (width / 2)}
            y={y + (height / 2) + 9}
            textAnchor="middle"
            fill="#fff"
            stroke="none"
            fontSize={fontSize}
            fillOpacity={0.5}
          >
            {sector.name}
          </Text> )
          : null
        }
        {
          depth === 1 ?
            <Text
              x={x + 4}
              y={y + 21}
              fill="#fff"
              fillOpacity={0.9}
              fontSize={fontSize}
            >
              {percent}%
            </Text>
            : null
        }
      </g>
    );
  }
}