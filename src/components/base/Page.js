import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';

import { size as screenSize } from '../../helpers/screen';
import Trans from '../../locales/Trans';

import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';
import Breadcrumbs from './Breadcrumbs';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSlider: false
    };
    this.onOpenSlider = this.onOpenSlider.bind(this);
  }

  onOpenSlider() {
    this.setState({openSlider: !this.state.openSlider})
  }

  render() {
    const { children, breadcrumbItems } = this.props;
    const { openSlider } = this.state;
    const menuItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/donors', text: <Trans id='main.menu.donors' text='Donors' />},
      {url: '/countries', text: <Trans id='main.menu.countries' text='Countries' />},
      {url: '/services', text: <Trans id='main.menu.services' text='Our Services' />},
      {url: '/projects', text: <Trans id='main.menu.projects' text='Projects' />},
      {url: '/about', text: <Trans id='main.menu.about' text='About' />},
    ];
    return (
      <Fragment>
          <Header menuItems={menuItems} onOpenSlider={this.onOpenSlider} openSlider={openSlider} />
          {breadcrumbItems ? <Breadcrumbs items={breadcrumbItems} /> : null}
          <div >
              <MediaQuery maxWidth={screenSize.tablet.headerMaxWidth}>
                  <Slider menuItems={menuItems} open={openSlider} onOpenChange={this.onOpenSlider}>
                      {children}
                  </Slider>
              </MediaQuery>
              <MediaQuery minWidth={screenSize.desktop.headerMinWidth}>
                  {children}
              </MediaQuery>
          </div>
          <Footer/>
      </Fragment>
    )
  }
}

export default Page;