import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';

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
        <h4>{props.usd} {formatNumberComma(data.value)}</h4>
      </Content>
    </Card> : null;
};

class DonorsTreeMap extends Component {
  render() {
    const { data, intl } = this.props;
    const ColorPlatte = [
        '#ffb81c',
        '#ffca55',
        '#ffdc8e',
        '#ffeabb',
        '#ffb81c',
        '#ffca55',
        '#ffdc8e',
        '#ffeabb'];
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
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
                     onClick={e => this.props.history.push(`/donors/${e.code.toLowerCase()}`)}
            >
              <Tooltip wrapperStyle={{ opacity: '1' }} content={<CustomToolTip usd={usd}/>}/>
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

export default withRouter(injectIntl(DonorsTreeMap));
