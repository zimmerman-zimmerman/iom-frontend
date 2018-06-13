import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';

import MainHeader from '../../components/MainHeader';
import MainBreadcrumd from '../../components/MainBreadcrumb';
import MainFooter from '../../components/MainFooter';
import Trans from '../../locales/Trans';
import {size as screenSize} from "../../helpers/screen";

class Home extends Component {
  render() {
    const breadcrumbItems = [
      {url: '/', text: <Trans id='breadcrumb.home' text='Home' />, active: false},
      {url: '*', text: <Trans id='about.breadcrumb.about' text='About' />, active: true},
    ];
    return (
      <Fragment>
        <MainHeader />
        <MediaQuery minWidth={screenSize.tablet.minWidth} maxWidth={screenSize.tablet.maxWidth}>
          <MainBreadcrumd items={breadcrumbItems} separator=">" size="md" />
        </MediaQuery>
        <MediaQuery minWidth={screenSize.desktop.minWidth}>
          <MainBreadcrumd items={breadcrumbItems} separator=">" size="lg" />
        </MediaQuery>
        <MainFooter/>
      </Fragment>
    );
  }
}

export default Home;