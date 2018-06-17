import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';

import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import BannerImage from '../../components/BannerImage';
import BannerText from '../../components/BannerText';
import Trans from '../../locales/Trans';
import {size as screenSize} from "../../helpers/screen";
import image from '../../assets/images/IOM_picture.jpg';
import HomeChart from './containers/HomeChart';

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
      <Fragment>
        <MainHeader />
        <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
          <Banner height={250} size="xs" />
        </MediaQuery>
        <MediaQuery minWidth={screenSize.tablet.minWidth} maxWidth={screenSize.tablet.maxWidth}>
          <Banner height={400} size="md" />
        </MediaQuery>
        <MediaQuery minWidth={screenSize.desktop.minWidth}>
          <Banner height={500} size="lg" />
        </MediaQuery>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={12} md={4} lg={4}>
              <HomeChart/>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <HomeChart/>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <HomeChart/>
            </Col>
          </Row>
        </Grid>
        <MainFooter/>
      </Fragment>
    );
  }
}

export default Home;