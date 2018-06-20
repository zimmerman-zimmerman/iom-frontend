import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Page from '../../components/base/Page';
import Filters from '../../components/base/Filters';
import Trans from '../../locales/Trans';

class Donors extends Component {
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
              <Filters />
              <br />
            </Col>
          </Row>
        </Grid>
      </Page>
    )
  }
}


export default Donors;