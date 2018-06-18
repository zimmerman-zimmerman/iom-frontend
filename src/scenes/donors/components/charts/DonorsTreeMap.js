import React, { Component } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Layout from 'antd/es/layout';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import get from 'lodash/get';

import { format } from "d3-format";

import DonorsTreeMapItem from './DonorsTreeMapItem';

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = get(props, 'payload[0].payload');
  return data ?
    <Card style={{width: 270}}>
      <Content>
        <h3>{data.participating_organisation}</h3>
        <h4>{format(".2s")(data.value)}</h4>
       </Content>
    </Card> : null;
};

class DonorsTreeMap extends Component {
  render() {
    const { data } = this.props;
    const ColorPlatte = ['#4663a8', '#6f7db6', '#c3cbe3', '#e9ebf6', '#4663a8', '#6f7db6', '#c3cbe3', '#e9ebf6'];
    return (
      <Row>
        <Col span={24}>
          <ResponsiveContainer height={360} >
            <Treemap style={{fontSize: 35}}
                     data={data}
                     dataKey="value"
                     ratio={4/3}
                     stroke="#fff"
                     content={<DonorsTreeMapItem bgColors={ColorPlatte}/>}
            >
              <Tooltip content={<CustomToolTip/>}/>
            </Treemap>
          </ResponsiveContainer>
        </Col>
      </Row>
    )
  }
}

export default DonorsTreeMap;