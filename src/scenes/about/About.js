import React from 'react';

import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';

import AboutContent from './components/AboutContent';

const About = () => {

  const breadcrumbItems = [
    {url: '/', text: <Trans id='main.menu.home' text='Home' />},
    {url: null, text: <Trans id='main.menu.about' text='About' />},
  ];
  return (
    <Page breadcrumbItems={breadcrumbItems}>
      <AboutContent/>
    </Page>
  );
};

export default About;