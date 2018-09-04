import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';

import Card from 'antd/es/card';
import Layout from 'antd/es/layout';
import {  Row, Col } from 'react-flexbox-grid';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import get from 'lodash/get';

import DonorsTreeMapItem from './DonorsTreeMapItem';

import { formatNumberComma } from '../../../../helpers/generic';

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = get(props, 'payload[0].payload');
  return data ?
    <Card style={{width: 270}}>
      <Content>
        <h3>{data.name}</h3>
        <h4>US$ {formatNumberComma(data.value)}</h4>
      </Content>
    </Card> : null;
};

class DonorsTreeMap extends Component {
  render() {
    const { data } = this.props;
    const ColorPlatte = ['#4663a8', '#6f7db6', '#c3cbe3', '#e9ebf6', '#4663a8', '#6f7db6', '#c3cbe3', '#e9ebf6'];
    return (
      <Row>
        <Col xs={12}>
          <ResponsiveContainer height={360} >
            <Treemap className="tree-map"
                     isAnimationActive={false}
                     data={data}
                     dataKey="value"
                     ratio={4/3}
                     stroke="#fff"
                     content={<DonorsTreeMapItem bgColors={ColorPlatte}/>}
                     animationDuration={800}
            >
              <Tooltip wrapperStyle={{ opacity: '1' }} content={<CustomToolTip/>}/>
            </Treemap>
          </ResponsiveContainer>
        </Col>
      </Row>
    )
  }
}

DonorsTreeMap.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(DonorsTreeMap);