import React, { Component } from 'react';
import { Menu } from 'antd';
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";

import '../../styles/main/MainMenu.scss';

class MainMenu extends Component {
  handleClick = (e) => {
    this.props.history.push(e.key);
  };

  render() {
    const {location} = this.props;
    return (
      <Menu onClick={this.handleClick}
            className="MainMenu"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          <FormattedMessage id="main.menu.home" defaultMessage="Home"/>
        </Menu.Item>
        <Menu.Item key="/donors">
          <FormattedMessage id="main.menu.donors" defaultMessage="Donors"/>
        </Menu.Item>
        <Menu.Item key="/countries">
          <FormattedMessage id="main.menu.countries" defaultMessage="Countries"/>
        </Menu.Item>
        <Menu.Item key="/services">
          <FormattedMessage id="main.menu.services" defaultMessage="Our Services"/>
        </Menu.Item>
        <Menu.Item key="/projects">
          <FormattedMessage id="main.menu.projects" defaultMessage="Projects"/>
        </Menu.Item>
        <Menu.Item key="/about">
          <FormattedMessage id="main.menu.about" defaultMessage="About"/>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(MainMenu));