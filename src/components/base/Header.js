import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'antd/es/button';
import MdMenu from 'react-icons/lib/md/menu';
import MdClose from 'react-icons/lib/md/close';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaFeed from 'react-icons/lib/fa/feed';
import injectSheet from 'react-jss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import * as genericActions from '../../services/actions/generic';

import { size as screenSize } from '../../helpers/screen';
import { variables as styleVariables } from '../../helpers/style';

import Menus from './Menus';
import logo from '../../assets/iom-logo.svg';
import logoOnly from '../../assets/iom-logo-only.svg';
import ShareIcon from '../../icons/share';
import ShareDialog from '../dialogWindow/ShareDialog/ShareDialog';


class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  render() {
    const { classes, match, onOpenSlider, openSlider, menuItems } = this.props;
    let urlPath = match.path;
    switch (urlPath) {
      case '/donors/:group/:code':
        urlPath = '/donors';
        break;
        case '/donors/:group':
            urlPath = '/donors';
            break;
      case '/countries/:code':
        urlPath = '/countries';
        break;
      case '/projects/:id':
        urlPath = '/projects';
        break;
      case '/services/:id':
        urlPath = '/services';
        break;
      default:
    }

    const Logo = (props) => {
      if (props.size === 'xs') {
        return <img src={logoOnly} alt="logo" className={classes.logo} />;
      } else {
        return <img src={logo} alt="logo" className={classes.logo} />;
      }
    };

    const TriggerMenu = (props) => {
      return (
        <Row end={props.size}>
          <div >
            {!openSlider ?
              <MdMenu className={classes.triggerMenu} onClick={onOpenSlider} /> :
              <MdClose className={classes.triggerMenu} onClick={onOpenSlider} />
            }
          </div>
        </Row>
      )
    };

    const Share = (props) => {
      const { size } = props;
      return (
        <Row middle={size} className={classes.share}>
          <Col lg={12}>
            <Button shape="circle" onClick={()=> window.location = 'https://twitter.com/UNmigration'} icon="twitter" />
            <Button shape="circle" onClick={()=> window.location = 'https://www.facebook.com/IOM'}>
                <FaFacebook className={classes.faIcon} />
            </Button>
            <Button shape="circle" onClick={()=> window.location = 'https://www.iom.int/rss-feeds'}>
                <FaFeed className={classes.faIcon} />
            </Button>
            <Button shape="circle" onClick={() => this.props.dispatch(genericActions.toggleModalRequest(<ShareDialog/>, true))}><ShareIcon className='share-icon'/></Button>
          </Col>
        </Row>
      )
    };

    const Content = (props) => {
      const { size } = props;
      return (
        <div className={classes.innerHeader}>
          <div className={classes.logoHeader}>
            <Logo size={size}/>
          </div>
          <div className={classes.tabsHeader}>
            {size === 'lg' ? <Menus items={menuItems} urlPath={urlPath} /> : null}
            {size === 'xs' || size === 'md' ? <TriggerMenu size={size} /> : null}
          </div>
          {size === 'lg' ? <div className={classes.shareCol}><Share size={size} /></div> : null}
        </div>
      )
    };

    return (
      <Grid fluid className={classes.header}>
        <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
          <Content size="xs"/>
        </MediaQuery>
        <MediaQuery minWidth={screenSize.tablet.minWidth} maxWidth={screenSize.tablet.maxWidth}>
          <Content size="md"/>
        </MediaQuery>
        <MediaQuery minWidth={screenSize.desktop.minWidth}>
          <Content size="lg"/>
        </MediaQuery>
      </Grid>
    )
  }
}

const styles = {
  header: {
    '@media (min-width: 992px)': {
      height: 70,
    },
      position:'sticky',
      top: 0,
      zIndex:100,
    backgroundColor: styleVariables.blue,
    padding: '0 10px !important',
      width: '100%',
  },
    innerHeader: {
      display: 'flex',
        height: 'inherit',
    },
    logoHeader: {
      order: 1,
      margin: 'auto auto auto 0',
    },
    tabsHeader: {
      order:2,
        margin: '28px 0 0 auto',
        width: 'max-content',
        '@media (max-width: 990px)': {
            minHeight: '60px',
            margin: '0 5px 0 5px',
        },
    },
  logo: {
    padding: '10px 0',
    height: 60,
    '@media (max-width: 991px)': {
      height: 50
    },
  },
  triggerMenu: {
    color: 'white',
    fontSize: 40,
  },
  shareCol: {
    order: 3,
      margin: 'auto 0 auto 20px',
  },
  share: {
    width: 'max-content',
    marginTop: 16,
    '& $button': {
      marginLeft: 16,
      color: '#0033a1',
      size: 32,
      '&:hover': {
        color: '#35b6b4',
      }
    },
    '& $button:first-child': {
      marginLeft: 0,
    }
  },
  faIcon: {
    marginTop: -3.
  }
};

const mapStateToProps = (state, ) => {
  return {};
};

export default injectSheet(styles)(withRouter(connect(mapStateToProps)(Header)));
