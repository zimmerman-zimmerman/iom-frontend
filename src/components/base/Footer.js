import React from 'react';
import injectSheet from "react-jss";
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import FaFacebook from 'react-icons/lib/fa/facebook';
import * as genericActions from '../../services/actions/generic';

import { variables as styleVariables } from '../../helpers/style';
import Trans from '../../locales/Trans';
import {connect} from "react-redux";

import GenericDialog from '../dialogWindow/GenericDialog/GenericDialog';

import './styles/Footer.scss';

const Footer = (props) => {
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
              <Button shape="circle" icon="twitter"
                      onClick={()=> window.location = 'https://twitter.com/UNmigration'}/>
              <Button shape="circle" className={classes.faButton}
                      onClick={()=> window.location = 'https://www.facebook.com/IOM'}>
                  <FaFacebook className={classes.faIcon} />
              </Button>
            </Col>
            <Col md={6} lg={6} className={classes.gap}>
              <h3 className={classes.text}><Trans id="footer.website" text="IOM website" /></h3>
              <a href="https://www.iom.int" target="_blank" rel="noopener noreferrer"><Trans id="footer.website.url" text="www.iom.int"/></a>
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
              <div className={'link-container'}>
                  <div className={'link'}>
                      <Trans  id="footer.copyright" text="© 2018 Migration data portal"/>
                  </div>
                <div>
                    <Divider type="vertical"/>
                </div>
                  <div className={'link'}>
                      <Trans  id="footer.term" text="Term of use"/>
                  </div>
                  <div>
                      <Divider type="vertical"/>
                  </div>
                  <div className={'link'} onClick={() =>
                           props.dispatch(genericActions.toggleModalRequest(
                               <GenericDialog text={<Trans  id="disclaimer.text" text="Disclaimer text"/>}
                                              buttonText={<Trans  id="disclaimer.button.text" text="CONTINUE"/>}
                                              handleClick={() => props.dispatch(genericActions.toggleModalRequest())}/>))}>
                      <Trans  id="footer.disclaimer" text="Disclaimer" />
                  </div>
              </div>
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
    '& a': {
      color: 'white',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
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

export default injectSheet(styles)(connect(null)(Footer));