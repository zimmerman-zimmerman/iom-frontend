import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Drawer, List } from 'antd-mobile';

import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import BannerImage from '../../components/BannerImage';
import BannerText from '../../components/BannerText';
import Trans from '../../locales/Trans';
import {size as screenSize} from "../../helpers/screen";
import image from '../../assets/images/IOM_picture.jpg';
import HomeDonors from './components/HomeDonors';
import HomeActivities from './components/HomeActivities';
import HomeSectors from './components/HomeSectors';
import injectSheet from "react-jss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  };

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
    const sidebar = (<List>
      {[0, 1, ].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
                             multipleLine
          style={{backgroundColor: '#0033a1'}}>Category</List.Item>);
        }
        return (<List.Item key={index}
        >Category{index}</List.Item>);
      })}
    </List>);
    return (
      <Fragment>
        <MainHeader onOpenChange={this.onOpenChange} />
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
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
        <MainFooter/>
        </Drawer>
      </Fragment>
    );
  }
}

const styles = {}


export default injectSheet(styles)(Home);