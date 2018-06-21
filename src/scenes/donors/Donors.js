import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {injectIntl, intlShape} from 'react-intl';

import Page from '../../components/base/Page';
import Filters from '../../components/base/Filters';
import Trans from '../../locales/Trans';
import BaseFilter from '../../components/filters/BaseFilter';
import * as actions from "../../services/actions";

class Donors extends BaseFilter {
  render() {
    const { intl } = this.props;
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.donors' text='Donors' />},
    ];
    const panelItems = [{
      headerString: "Geo-location",
      rootComponent: this,
      placeholder: intl.formatMessage({
        id: 'countries.filters.geo.location.placeholder', defaultMessage: 'Select country'
      }),
      reducerName: "transactionsAggregationsCountries",
      optionKeyName: "recipient_country.code",
      optionValueName: "recipient_country.name",
      groupBy: "recipient_country",
      fieldName: "recipient_country",
      actionRequest: actions.transactionsAggregationsCountriesRequest
    }];
    return (
      <Page breadcrumbItems={breadcrumbItems}>
        <Grid fluid>
          <Row>
            <Col xs={12} md={4} lg={3} >
              <Filters rootComponent={this} panelItems={panelItems} />
              <br />
            </Col>
          </Row>
        </Grid>
      </Page>
    )
  }
}

Donors.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Donors);