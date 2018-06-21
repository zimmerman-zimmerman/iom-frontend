import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {injectIntl, intlShape} from 'react-intl';
import injectSheet from 'react-jss';
import PropsType from 'prop-types';

import SearchFilter from './SearchFilter';
import AccordionFilter from './AccordionFilter';

class Filters extends Component {
  render() {
    const { intl, rootComponent, classes, panelItems } = this.props;
    return (
      <Fragment>
        <Row className={classes.filters}>
          <Col xs={12}>
            <SearchFilter
              rootComponent={rootComponent}
              placeholder={
                intl.formatMessage({id: 'filters.search.placeholder', defaultMessage: 'Search'})
              }
              fieldName="q"
            />
          </Col>
        </Row>
        <AccordionFilter rootComponent={rootComponent} panelItems={panelItems} />
      </Fragment>
    )
  }
}

Filters.propTypes = {
  intl: intlShape.isRequired,
  rootComponent: PropsType.object,
  panelItems: PropsType.array,
};

const styles = {
  filters: {
    marginTop: 20
  },
};

export default injectSheet(styles)(injectIntl(Filters));