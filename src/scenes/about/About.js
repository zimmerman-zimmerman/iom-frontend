import React from 'react';

import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';

import AboutContent from './components/AboutContent';

const About = () => {

  return (
    <Page pageName={<Trans id='main.menu.about' text='About' />}>
      <AboutContent/>
    </Page>
  );
};

export default About;