import React from 'react';
import injectSheet from "react-jss";
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import FaFacebook from 'react-icons/lib/fa/facebook';

import { variables as styleVariables } from '../helpers/style';
import Trans from '../locales/Trans';

const MainFooter = (props) => {
  const { classes } = props;
  return (
    <Grid fluid className={classes.footer}>
      <Row>
        <Col xs={12} md={4} lg={3} className={classes.gap}>
          <h3 className={classes.text}><Trans id='footer.contact' text='Contact us' /></h3>
          <Row>
            <Col lg={12}>
              <Trans id='footer.address' text='17 Route des Morillos' />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Trans id='footer.city' text='1218 Grand-Saconnex' />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Trans id='footer.country' text='Switzerland' />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={5} lg={3}>
          <Row>
            <Col md={6} lg={6} className={classes.share}>
              <h3 className={classes.text}><Trans id="footer.follow" text="Follow us" /></h3>
              <Button shape="circle" icon="twitter" />
              <Button shape="circle" className={classes.faButton}><FaFacebook className={classes.faIcon} /></Button>
            </Col>
            <Col md={6} lg={6} className={classes.gap}>
              <h3 className={classes.text}><Trans id="footer.website" text="IOM website" /></h3>
              <Trans id="footer.website.url" text="www.iom.int"/>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} lg={3} className={classes.gap}>
          <Trans id="footer.phone" text="Tel. +41.22.717.9111" />
        </Col>
        <Col xs={12} md={9} lg={9} className={classes.gap}>
          <Row start="xs" end="md">
            <Col xs={12} md={9} lg={7}>
              <Trans  id="footer.copyright" text="© 2018 Migration data portal"/>
              <Divider type="vertical"/>
              <Trans  id="footer.term" text="Term of use"/>
              <Divider type="vertical"/>
              <Trans  id="footer.disclaimer" text="Disclaimer"/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
};

const styles = {
  footer: {
    backgroundColor: styleVariables.blue,
    color: 'white',
  },
  gap: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  text: {
    color: 'white',
  },
  share: {
    paddingTop: '10px',
    paddingBottom: '10px',
    float: 'right',
    '& $button': {
      color: '#0033a1',
      '&:hover': {
        color: '#35b6b4',
      }
    }
  },
  faButton: {
    marginLeft: 5,
  },
  faIcon: {
    marginTop: -3.
  }
};

export default injectSheet(styles)(MainFooter);