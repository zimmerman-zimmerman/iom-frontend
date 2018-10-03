import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Spin from 'antd/es/spin';
import get from 'lodash/get';

import Page from '../../components/base/Page';
import BannerImage from '../../components/base/BannerImage';
import BannerText from '../../components/base/BannerText';
import Trans from '../../locales/Trans';
import {size as screenSize} from "../../helpers/screen";
import HomeDonors from './components/HomeDonors';
import HomeActivities from './components/HomeActivities';
import HomeSectors from './components/HomeSectors';
import connect from "react-redux/es/connect/connect";
import * as actions from "../../services/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true
    }
  }

  componentDidMount() {
    const { dispatch, homeBackgroundSlug } = this.props;
    if (dispatch && this.state.reload) {
      dispatch(actions.homeMediaContentRequest(homeBackgroundSlug));
      this.setState({reload: false});
    } else {
      dispatch(actions.homeMediaContentInitial());
    }
  }

  render() {
    const { homeMediaContent, simpleContentHost } = this.props;
    const imageBanner = homeMediaContent.success ? simpleContentHost.concat(get(homeMediaContent.data, 'image')) : null;
    const title = <Trans id="banner.title" text="Title"/>;
    const description = <Trans id="banner.description" text="Description"/>;
    const detail = <Trans id="banner.detail" text="Detail"/>;
    const bannerText = <Trans id="banner.text.text" text="Text"/>;
    const Banner = (props) => {
      const { height, size } = props;
      return (
        <Fragment>
          <BannerImage image={imageBanner} height={height} title={title} description={description} detail={detail}
                       size={size}
          />
          <BannerText text={bannerText} />
        </Fragment>
      )
    };
    return (
      <Spin spinning={
        this.props.homeActivities.request || this.props.homeSectors.request || this.props.homeDonors.request
      }>
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
      </Spin>
    );
  }
}

Home.defaultProps = {
  homeBackgroundSlug: 'home-background',
  simpleContentHost: process.env.REACT_APP_SIMPLECONTENT_HOST
};

const mapStateToProps = (state, ) => {
  return {
    homeDonors: state.homeDonors,
    homeSectors: state.homeSectors,
    homeActivities: state.homeActivities,
    homeMediaContent: state.homeMediaContent
  }
};

export default connect(mapStateToProps)(Home);