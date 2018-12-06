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
import HomeServices from './components/HomeServices';
import connect from "react-redux/es/connect/connect";
import * as actions from "../../services/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true,
        servParams: {
          aggregations: 'activity_count,incoming_fund,disbursement,value',
              group_by: 'sector',
              order_by: '-value',
              sector: '1,2,3,4,5,6,7',
              hierarchy: 1,
              page_size: 5,
              reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
      },
    }
  }

  componentDidMount() {
    const { dispatch, homeBackgroundSlug, donutSlug, sectorMapping } = this.props;
    if (dispatch && this.state.reload) {

      dispatch(actions.homeMediaContentRequest(homeBackgroundSlug));
        dispatch(actions.donutDataJsonRequest(donutSlug));

        const servParams = this.state.servParams;
        servParams.sector = get(sectorMapping,
            'data.content.serviceAreaFilter.allCodes',
            servParams.sector);
        dispatch(actions.homeSectorsRequest(servParams));

      this.setState({reload: false, servParams});
    } else {
      dispatch(actions.homeMediaContentInitial());
    }
  }

  render() {
    const { homeMediaContent, simpleContentHost, homeService, donutData } = this.props;

    const donutContent = get(donutData, 'data.content', []);
    const donutRequest = donutData.request;
    const serviceResults = get(homeService, 'data.results', []);
    const serviceRequest = homeService.request;

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
      <Spin spinning={ homeService.request || donutData.request }>
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
                <HomeDonors dataResults={donutContent.Donors} request={donutRequest} />
              </Col>
              <Col xs={12} md={12} lg={4}>
                <HomeServices dataResults={serviceResults} request={serviceRequest} />
              </Col>
              <Col xs={12} md={12} lg={4}>
                <HomeActivities dataResults={donutContent.Projects} request={donutRequest} />
              </Col>
            </Row>
          </Grid>
        </Page>
      </Spin>
    );
  }
}

Home.defaultProps = {
  donutSlug: 'donut-data',
  homeBackgroundSlug: 'home-background',
  simpleContentHost: process.env.REACT_APP_SIMPLECONTENT_HOST
};

const mapStateToProps = (state, ) => {
  return {
      donutData: state.donutData,
    homeService: state.homeSectors,
      sectorMapping: state.sectorMapping,
    homeMediaContent: state.homeMediaContent
  }
};

export default connect(mapStateToProps)(Home);
