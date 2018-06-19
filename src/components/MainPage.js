import React, { Component, Fragment } from 'react';

import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

class MainPage extends Component {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <MainHeader/>
        {children}
        <MainFooter/>
      </Fragment>
    )
  }
}

export default MainPage;