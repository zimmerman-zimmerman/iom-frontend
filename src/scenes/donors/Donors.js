import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Page from '../../components/base/Page';
import Filters from '../../components/base/filters/Filters';
import Trans from '../../locales/Trans';
import BaseFilter from '../../components/filters/BaseFilter';

class Donors extends BaseFilter {
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

export default Donors;