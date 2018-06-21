import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {injectIntl, intlShape} from 'react-intl';
import injectSheet from 'react-jss';
import Accordion from 'antd-mobile/es/accordion';
import PropsType from 'prop-types';

import Filter from './Filter';
import SearchFilter from './SearchFilter';
import * as actions from '../../services/actions';

class Filters extends Component {
  render() {
    const { intl, rootComponent, classes } = this.props;
    return (
      <Fragment>
        <Row className={classes.filters}>
          <Col xs={12}>
            <SearchFilter
              rootComponent={rootComponent}
              placeholder={
                intl.formatMessage({id: 'countries.filters.search.placeholder', defaultMessage: 'Search'})
              }
              fieldName="q"
            />
          </Col>
        </Row>
        <Row className={classes.filters}>
          <Col xs={12}>
            <Accordion>
              <Accordion.Panel header="Geo-location">
                <Filter
                  rootComponent={rootComponent}
                  style={{width: '100%'}}
                  placeholder={
                    intl.formatMessage({
                      id: 'countries.filters.geo.location.placeholder', defaultMessage: 'Select country'
                    })
                  }
                  reducerName="transactionsAggregationsCountries"
                  optionKeyName="recipient_country.code"
                  optionValueName="recipient_country.name"
                  groupBy="recipient_country"
                  fieldName="recipient_country"
                  actionRequest={actions.transactionsAggregationsCountriesRequest}
                />
              </Accordion.Panel>
            </Accordion>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

Filters.propTypes = {
  intl: intlShape.isRequired,
  rootComponent: PropsType.object,
};

const styles = {
  filters: {
    marginTop: 20,
    '& .am-accordion': {
      borderTop: 'none',
      backgroundColor: '#f5f5f9',
    },
    '& .am-accordion .am-accordion-item .am-accordion-header': {
      backgroundColor: '#f5f5f9',
    },
    '& .am-accordion-content-box': {
      padding: '10px 0',
      backgroundColor: '#f5f5f9',
      borderBottom: '0 !important',

    }
  },
};

export default injectSheet(styles)(injectIntl(Filters));