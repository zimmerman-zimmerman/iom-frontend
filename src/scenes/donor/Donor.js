import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';

import Page from '../../components/base/Page';
import BaseFilter from '../../components/filters/BaseFilter';
import _ from "lodash";
import * as actions from "../../services/actions/index";
import {connect} from "react-redux";
import DonorProjects from "./components/DonorProjects";
import Trans from '../../locales/Trans';

class Donor extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = _.get(this.props, 'match.params.code');
    if (dispatch && code) {
      this.actionRequest(
        _.extend({}, params, {participating_organisation_ref: code.toUpperCase()}),
        'participating_organisation',
        actions.donorRequest
      );
    } else {
      actions.donorInitial();
    }
  }

  render() {
    const { classes } = this.props;
    const code = _.get(this.props, 'match.params.code');
    const data = _.get(this.props, 'donor.data.results[0]');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/donors', text: <Trans id='main.menu.donors' text='Donors' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    return (
      <Page breadcrumbItems={breadcrumbItems}>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h2 className={classes.title}>{data ? data.participating_organisation : null}</h2>
            </Col>
          </Row>
          <Row className={classes.table}>
            <Col xs={12}>
              <DonorProjects code={code}/>
            </Col>
          </Row>
        </Grid>
      </Page>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    donor: state.donor,
  }
};

const styles = {
  title: {
    marginTop: 5,
    marginBottom: 5,
  },
  table: {
    marginBottom: 15,
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Donor));