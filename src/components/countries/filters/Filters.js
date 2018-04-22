import React, { Component } from 'react';
import { Layout, Row, Col, Badge, Collapse } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import  _ from 'lodash';

import Filter from './Filter';
import * as actions from '../../../actions/index';
import SearchFilter from './SearchFilter';
import StartEndDateFilter from './StartEndDateFilter';
import '../../../styles/countries/filters/Filters.scss';

const { Content } = Layout;
const Panel = Collapse.Panel;

class Filters extends Component {
  countCountries() {
    const { data } = this.props;
    const count = _.get(data, 'results.length') ?  data.results.length : 0;
    const text = count > 1 ? <FormattedMessage id="countries.filters.countries" defaultMessage="Countries"/>
      : <FormattedMessage id="countries.filters.country" defaultMessage="Country"/>;
    return (<Content>{count} {text}</Content>)
  }

  render() {
    const { intl, rootComponent } = this.props;
    const filterCount = _.size(_.get(rootComponent, 'state.filters.values'));
    return(
      <Content className="Filters">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={22}>
                <SearchFilter
                  rootComponent={rootComponent}
                  placeholder={
                    intl.formatMessage({id: 'countries.filters.search.placeholder', defaultMessage: 'Search'})
                  }
                  fieldName="q"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={22} style={{marginTop: 15}}>
            <h3 style={{height: 30}}>
              {this.countCountries()}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={22} className="BorderBottom">
            <Badge count={filterCount}
                   showZero={true}
                   style={{ backgroundColor: '#f7c989' }}
            />
            <span style={{marginLeft: 5}}>
              <FormattedMessage id="countries.filters.count" defaultMessage="Filter(s)"/>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Collapse bordered={false}>
              <Panel header={intl.formatMessage({id: 'countries.filters.geo.location', defaultMessage: 'Geo-location'})}
                     key="1"
              >
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
              </Panel>
              <Panel header={intl.formatMessage({
                  id: 'countries.filters.project.types', defaultMessage: 'Project types'}
                )}
                     key="2"
              >
                <Filter
                  rootComponent={rootComponent}
                  style={{width: '100%'}}
                  placeholder={
                    intl.formatMessage({
                      id: 'countries.filters.project.types.placeholder', defaultMessage: 'Select project type'
                    })
                  }
                  reducerName="transactionsAggregationsSector"
                  optionKeyName="sector.code"
                  optionValueName="sector.name"
                  groupBy="sector"
                  fieldName="sector"
                  actionRequest={actions.transactionsAggregationsSectorRequest}
                />
              </Panel>
              <Panel header={intl.formatMessage({
                id: 'countries.filters.project.status', defaultMessage: 'Project status'}
              )}
                     key="3"
              >
                <Filter
                  rootComponent={rootComponent}
                  style={{width: '100%'}}
                  placeholder={
                    intl.formatMessage({
                      id: 'countries.filters.project.status.placeholder', defaultMessage: 'Select project status'
                    })
                  }
                  reducerName="transactionsAggregationsActivityStatus"
                  optionKeyName="activity_status.code"
                  optionValueName="activity_status.name"
                  groupBy="activity_status"
                  fieldName="activity_status"
                  actionRequest={actions.transactionsAggregationsActivityStatusRequest}
                />
              </Panel>
              <Panel header={intl.formatMessage({
                id: 'countries.filters.start.end.date', defaultMessage: 'Start - end data'}
              )}
                     key="4"
              >
                <StartEndDateFilter rootComponent={rootComponent}/>
              </Panel>
              <Panel header={intl.formatMessage({
                id: 'countries.filters.participating.organisation', defaultMessage: 'Donors'}
              )}
                     key="5"
              >
                <Filter
                  rootComponent={rootComponent}
                  style={{width: '100%'}}
                  placeholder={
                    intl.formatMessage({
                      id: 'countries.filters.participating.organisation.placeholder', defaultMessage: 'Select donor'
                    })
                  }
                  reducerName="transactionsAggregationsParticipatingOrganisation"
                  optionKeyName="participating_organisation_ref"
                  optionValueName="participating_organisation"
                  groupBy="participating_organisation"
                  fieldName="participating_organisation_ref"
                  actionRequest={actions.transactionsAggregationsParticipatingOrganisationRequest}
                />
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Content>
    )
  }
}

Filters.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Filters);