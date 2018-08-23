import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import findIndex from 'lodash/findIndex';

import * as genericActions from '../../services/actions/generic';

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
      openSlider: false,
        breadcrumbItems: props.breadCrumbs.breadcrumbItems ? props.breadCrumbs.breadcrumbItems : [],
        currentPath: window.location.pathname,
    };
    this.onOpenSlider = this.onOpenSlider.bind(this);
  }

  componentDidMount(){
    let breadcrumbItems = this.state.breadcrumbItems;
    console.log(this.props.pageName);
    const existingBreadIndex = findIndex(breadcrumbItems, item => item.text.props.text === this.props.pageName.props.text);
    if(existingBreadIndex > -1)
    {
        breadcrumbItems.splice(existingBreadIndex);
    }

    breadcrumbItems.push({
        url: null,
        text: this.props.pageName,
    });

    this.setState({
        breadcrumbItems,
    });
  }

  componentWillUnmount(){
      let breadcrumbItems = this.state.breadcrumbItems;
      breadcrumbItems[breadcrumbItems.length-1].url = this.state.currentPath;
      this.props.dispatch(genericActions.updateBreadcrumbsRequest(breadcrumbItems));
  }

  onOpenSlider() {
    this.setState({openSlider: !this.state.openSlider})
  }

  render() {
    const { children } = this.props;
    const { openSlider, breadcrumbItems, currentPath } = this.state;
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
        <MediaQuery maxWidth={screenSize.tablet.maxWidth}>
          <Slider menuItems={menuItems} open={openSlider} onOpenChange={this.onOpenSlider}>
            {breadcrumbItems && currentPath !== '/' ? <Breadcrumbs items={breadcrumbItems} /> : null}
            {children}
            <Footer/>
          </Slider>
        </MediaQuery>
        <MediaQuery minWidth={screenSize.desktop.minWidth}>
          {breadcrumbItems && currentPath !== '/' ? <Breadcrumbs items={breadcrumbItems} /> : null}
          {children}
          <Footer/>
        </MediaQuery>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
    return {
        breadCrumbs: state.breadCrumbs,
    }
};

export default (connect(mapStateToProps)(Page));