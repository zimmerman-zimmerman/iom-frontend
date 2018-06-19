import React, { Component, Fragment } from 'react';

import Header from './Header';
import Footer from './Footer';

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Header/>
        {children}
        <Footer/>
      </Fragment>
    )
  }
}

export default Page;