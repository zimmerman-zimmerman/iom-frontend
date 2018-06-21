import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from "react-redux";

import Page from '../../components/base/Page';
import Filters from '../../components/base/filters/Filters';
import Trans from '../../locales/Trans';
import BaseFilter from '../../components/filters/BaseFilter';
import * as actions from "../../services/actions";

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
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.donors' text='Donors' />},
    ];
    return (
      <Page breadcrumbItems={breadcrumbItems}>
        <Grid fluid>
          <Row>
            <Col xs={12} md={4} lg={3} >
              <Filters rootComponent={this} />
              <br />
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

export default connect(mapStateToProps)(Donors);