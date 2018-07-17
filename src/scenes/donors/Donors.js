import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from "react-redux";
import get from 'lodash/get';
import injectSheet from 'react-jss';
import { FormattedMessage } from "react-intl";
import MediaQuery from 'react-responsive';

import Page from '../../components/base/Page';
import Filters from '../../components/base/filters/Filters';
import Trans from '../../locales/Trans';
import BaseFilter from '../../components/base/filters/BaseFilter';
import * as actions from "../../services/actions";
import DonorsTreeMap from './components/charts/DonorsTreeMap';
import DonorsTable from './components/DonorsTable';
import {size as screenSize} from "../../helpers/screen";

class Donors extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'participating_organisation', actions.donorsRequest);
      } else {
        dispatch(actions.donorsInitial());
      }
    }
  }

  render() {
    const { donors, classes } = this.props;
    const data = get(donors, 'data');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.donors' text='Donors' />},
    ];
    return (
      <Page breadcrumbItems={breadcrumbItems}>
        <Grid fluid>
          <Row>
            <Col xs={12} md={4} lg={3} >
              <Filters rootComponent={this} countResults={get(data, 'results.length', 0)}
                       pluralMessage={<FormattedMessage id="donors.filters.donors" defaultMessage="Donors" />}
                       singularMessage={<FormattedMessage id="donors.filters.donor" defaultMessage="Donor" />}

              />
            </Col>
            <Col xs={12} md={8} lg={9}>
              <Row className={classes.rowGap}>
                <Col xs={12}>
                  <h1 className={classes.title}><FormattedMessage id="donors.title" defaultMessage="Donors" /></h1>
                </Col>
              </Row>
              <MediaQuery minWidth={screenSize.mobile.maxWidth}>
                <Row>
                  <Col xs={12}>
                    <h2><FormattedMessage id="donors.description" defaultMessage="Description" /></h2>
                  </Col>
                </Row>
              </MediaQuery>
              <Row>
                <Col xs={12}>
                  <DonorsTreeMap data={get(data, 'results') ? data.results : []}/>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <DonorsTable data={data} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Page>
    )
  }
}

Donors.defaultProps = {
  groupBy: 'participating_organisation',
  filterRequest: actions.donorsRequest,
};

const mapStateToProps = (state, ) => {
  return {
    donors: state.donors
  }
};

const styles = {
  rowGap: {
    marginTop: 10
  },
  title: {
    fontWeight: 300,
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Donors));