import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {injectIntl, intlShape} from 'react-intl';
import injectSheet from 'react-jss';
import Accordion from 'antd-mobile/es/accordion';

import SearchFilter from '../../components/filters/SearchFilter';

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
            <Accordion defaultActiveKey="0" className="my-accordion">
              <Accordion.Panel header="Geo-location">
                Test
              </Accordion.Panel>
            </Accordion>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

Filters.propTypes = {
  intl: intlShape.isRequired
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
    }
  },
};

export default injectSheet(styles)(injectIntl(Filters));