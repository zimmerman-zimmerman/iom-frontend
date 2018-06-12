import React, { Component, Fragment } from 'react';

import MainHeader from '../../components/MainHeader';
import MainBreadcrumd from '../../components/MainBreadcrumb';
import Trans from '../../locales/Trans';

class Home extends Component {
  render() {
    const breadcrumbItems = [
      {url: '/', text: <Trans id='breadcrumb.home' text='Home' />, active: false},
      {url: '*', text: <Trans id='about.breadcrumb.about' text='About' />, active: true},
    ];
    return (
      <Fragment>
        <MainHeader />
        <MainBreadcrumd items={breadcrumbItems} separator=">" />
      </Fragment>
    );
  }
}

export default Home;