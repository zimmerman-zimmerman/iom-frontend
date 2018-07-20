import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import injectSheet from 'react-jss';
import PropsType from 'prop-types';
import get from "lodash/get";
import size from "lodash/size";
import Badge from 'antd/es/badge';
import MediaQuery from 'react-responsive';
import Collapse from 'antd/es/collapse';
import MdFilterList from 'react-icons/lib/md/filter-list';

import SearchFilter from './SearchFilter';
import AccordionFilter from './AccordionFilter';
import Filter from './Filter';
import StartEndDateFilter from './StartEndDateFilter';
import SliderFilter from './SliderFilter';
import * as actions from '../../../services/actions';
import {size as screenSize} from "../../../helpers/screen";

class Filters extends Component {
  defaultPanels(intl, rootComponent) {
    return [{
      headerString: intl.formatMessage({id: 'filters.panel.country', defaultMessage: 'Geo-location'}),
      component:
        <Filter rootComponent={rootComponent}
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
        <Filter rootComponent={rootComponent}
                placeholder={
                  intl.formatMessage({
                    id: 'filters.select.project.type.placeholder',
                    defaultMessage: 'Select project type'
                  })
                }
                reducerName="transactionsAggregationsSector"
                optionKeyName="sector.code"
                optionValueName="sector.name"
                groupBy="sector"
                fieldName="sector"
                actionRequest={actions.transactionsAggregationsSectorRequest}
        />
    },{
      headerString: intl.formatMessage({id: 'filters.panel.project.status', defaultMessage: 'Project status'}),
      component:
        <Filter rootComponent={rootComponent}
                placeholder={
                  intl.formatMessage({
                    id: 'filters.select.project.status.placeholder',
                    defaultMessage: 'Select project status'
                  })
                }
                reducerName="transactionsAggregationsActivityStatus"
                optionKeyName="activity_status.code"
                optionValueName="activity_status.name"
                groupBy="activity_status"
                fieldName="activity_status"
                actionRequest={actions.transactionsAggregationsActivityStatusRequest}
        />
    },{
      headerString: intl.formatMessage({id: 'filters.panel.period', defaultMessage: 'Start - end data'}),
      component:
        <StartEndDateFilter rootComponent={rootComponent} />
    },{
      headerString: intl.formatMessage({id: 'filters.panel.donors', defaultMessage: 'Donors'}),
      component:
        <Filter rootComponent={rootComponent}
                placeholder={
                  intl.formatMessage({
                    id: 'filters.select.donors.placeholder',
                    defaultMessage: 'Select donor'
                  })
                }
                reducerName="transactionsAggregationsParticipatingOrganisation"
                optionKeyName="participating_organisation_ref"
                optionValueName="participating_organisation"
                groupBy="participating_organisation"
                fieldName="participating_organisation_ref"
                actionRequest={actions.transactionsAggregationsParticipatingOrganisationRequest}
        />
    },
    {
      headerString: intl.formatMessage({id: 'filters.slider.funding', defaultMessage: 'Funding amount'}),
      component:
        <SliderFilter
          minValue={0}
          maxValue={1000000}
          rootComponent={rootComponent}
        />
    }];
  }

  countResults() {
    const { countResults, pluralMessage, singularMessage} = this.props;
    const text = countResults > 1 ? pluralMessage : singularMessage;
    return <h2>{countResults} {text}</h2>;
  }

  content() {
    const { intl, rootComponent, classes, panels } = this.props;
    const filterCount = size(get(rootComponent, 'state.filters.values'));
    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            {this.countResults()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Badge className={classes.badge} count={filterCount} showZero={true}  />
            <span style={{marginLeft: 5}}>
              <FormattedMessage id="filters.count" defaultMessage="Filter(s)"/>
            </span>
          </Col>
        </Row>
        <AccordionFilter rootComponent={rootComponent}
                         panels={panels ? panels : this.defaultPanels(intl, rootComponent)}
        />
      </Fragment>
    )
  }

  render() {
    const { intl, rootComponent, classes } = this.props;
    return (
      <Fragment>
        <Row className={classes.gap}>
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
        <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
          <Collapse bordered={false}>
            <Collapse.Panel
              className={classes.collapse}
              showArrow={false}
              header={
                <span>
                  <MdFilterList className={classes.icon} />
                  {intl.formatMessage({id: 'filters.show', defaultMessage: 'Show filters'})}
                </span>
              }
              key="1"
            >
              {this.content()}
            </Collapse.Panel>
          </Collapse>
        </MediaQuery>
        <MediaQuery minWidth={screenSize.tablet.minWidth}>
          <div className={classes.gap}>
            {this.content()}
          </div>
        </MediaQuery>
      </Fragment>
    );
  }
}

Filters.propTypes = {
  intl: intlShape.isRequired,
  rootComponent: PropsType.object,
  panels: PropsType.array,
  pluralMessage: PropsType.object,
  singularMessage: PropsType.object,
  countResults: PropsType.number,
};

const styles = {
  gap: {
    marginTop: 20
  },
  badge: {
    '& .ant-badge-count': {
      background: '#f7c989',
    }
  },
  icon: {
    fontSize: 20,
    marginTop: -5,
    marginRight: 5,
  },
  collapse: {
    background: '#f5f5f9',
    '& .ant-collapse-borderless > .ant-collapse-item': {
      borderBottom: '0 !important',
    }

  }
};

export default injectSheet(styles)(injectIntl(Filters));