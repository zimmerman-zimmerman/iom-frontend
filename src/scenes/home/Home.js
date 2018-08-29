import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Page from '../../components/base/Page';
import BannerImage from '../../components/base/BannerImage';
import BannerText from '../../components/base/BannerText';
import Trans from '../../locales/Trans';
import {size as screenSize} from "../../helpers/screen";
import image from '../../assets/images/IOM_picture.jpg';
import HomeDonors from './components/HomeDonors';
import HomeActivities from './components/HomeActivities';
import HomeSectors from './components/HomeSectors';

class Home extends Component {
  render() {
    const title = <Trans id="banner.title" text="Title"/>;
    const description = <Trans id="banner.description" text="Description"/>;
    const detail = <Trans id="banner.detail" text="Detail"/>;
    const bannerText = <Trans id="banner.text.text" text="Text"/>;
    const Banner = (props) => {
      const { height, size } = props;
      return (
        <Fragment>
          <BannerImage image={image} height={height} title={title} description={description} detail={detail}
                       size={size}
          />
          <BannerText text={bannerText} />
        </Fragment>
      )
    };
    return (
      <Page pageName={<Trans id='main.menu.home' text='Home' />}>
        <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
          <Banner height={250} size="xs" />
        </MediaQuery>
        <MediaQuery minWidth={screenSize.tablet.minWidth} maxWidth={screenSize.tablet.maxWidth}>
          <Banner height={400} size="md" />
        </MediaQuery>
        <MediaQuery minWidth={screenSize.desktop.minWidth}>
          <Banner height={600} size="lg" />
        </MediaQuery>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={12} md={12} lg={4}>
              <HomeDonors />
            </Col>
            <Col xs={12} md={12} lg={4}>
              <HomeActivities />
            </Col>
            <Col xs={12} md={12} lg={4}>
              <HomeSectors />
            </Col>
          </Row>
        </Grid>
      </Page>
    );
  }
}


export default Home;