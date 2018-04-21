import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Filter from './Filter';
import * as actions from "../../actions";

class Filters extends Component {
  render() {
    return(
      <Row>
        <Col span={24}>
          <Filter
            placeholder="Select country"
            reducerName="transactionsAggregationsCountries"
            optionKeyName="recipient_country.code"
            optionValueName="recipient_country.name"
            groupBy="recipient_country"
            fieldName="recipient_country"
            actionRequest={actions.transactionsAggregationsCountriesRequest}
          />
        </Col>
        <Col span={24}>
          <Filter
            placeholder="Select project type"
            reducerName="transactionsAggregationsSector"
            optionKeyName="sector.code"
            optionValueName="sector.name"
            groupBy="sector"
            fieldName="sector"
            actionRequest={actions.transactionsAggregationsSectorRequest}
          />
        </Col>
      </Row>
    )
  }
}

export default Filters;