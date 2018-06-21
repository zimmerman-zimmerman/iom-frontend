import React from 'react';
import * as actions from "../../../services/actions";
import {injectIntl, intlShape} from "react-intl";

import Filter from './Filter';

const PanelFilter = (props) => {
  const { intl } = props;
  const panels = [{
    headerString: intl.formatMessage({id: 'filters.panel.country', defaultMessage: 'Geo-location'}),
    component:
      <Filter rootComponent={this}
              placeholder={
                intl.formatMessage({
                  id: 'filters.select.country.placeholder',
                  defaultMessage: 'Select country'
                })
              }
              reducerName="transactionsAggregationsCountries"
              optionKeyName="recipient_country.code"
              optionValueName="recipient_country.name"
              groupBy="recipient_country"
              fieldName="recipient_country"
              actionRequest={actions.transactionsAggregationsCountriesRequest}
      />
  },{
    headerString: intl.formatMessage({id: 'filters.panel.project.type', defaultMessage: 'Project type'}),
    component:
      <Filter rootComponent={this}
              placeholder={
                intl.formatMessage({
                  id: 'filters.select.project.type.placeholder',
                  defaultMessage: 'Select project type'
                })
              }
              reducerName="transactionsAggregationsCountries"
              optionKeyName="recipient_country.code"
              optionValueName="recipient_country.name"
              groupBy="recipient_country"
              fieldName="recipient_country"
              actionRequest={actions.transactionsAggregationsCountriesRequest}
      />
  },{
    headerString: intl.formatMessage({id: 'filters.panel.project.status', defaultMessage: 'Project status'}),
    component:
      <Filter rootComponent={this}
              placeholder={
                intl.formatMessage({
                  id: 'filters.select.project.status.placeholder',
                  defaultMessage: 'Select project status'
                })
              }
              reducerName="transactionsAggregationsCountries"
              optionKeyName="recipient_country.code"
              optionValueName="recipient_country.name"
              groupBy="recipient_country"
              fieldName="recipient_country"
              actionRequest={actions.transactionsAggregationsCountriesRequest}
      />
  }];
};

PanelFilter.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(PanelFilter);