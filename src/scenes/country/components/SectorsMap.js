import React, { Component } from 'react';

import Card from 'antd/es/card';
import Layout from 'antd/es/layout';
import {  Row, Col } from 'react-flexbox-grid';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import get from 'lodash/get';

import SectorsTreeMapItem from './SectorsTreeMapItem';

import { formatNumberComma } from '../../../helpers/generic';
import {injectIntl, intlShape} from "react-intl";

const CustomToolTip = props => {
  const { Content } = Layout;
  const data = get(props, 'payload[0].payload');
  return data ?
    <Card style={{width: 270}}>
      <Content>
        <h3>{data.sector.name}</h3>
        <h4>{props.usd} {formatNumberComma(data.value)}</h4>
      </Content>
    </Card> : null;
};

class SectorsMap extends Component {
  render() {
    const { data, intl } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const ColorPlatte = [
        '#ffb81c',
        '#ffca55',
        '#ffdc8e',
        '#ffeabb',
        '#ffb81c',
        '#ffca55',
        '#ffdc8e',
        '#ffeabb'];
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
                     content={<SectorsTreeMapItem bgColors={ColorPlatte}/>}
            >
              <Tooltip content={<CustomToolTip usd={usd}/>}/>
            </Treemap>
          </ResponsiveContainer>
        </Col>
      </Row>
    )
  }
}

SectorsMap.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(SectorsMap);
