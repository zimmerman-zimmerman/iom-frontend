import React, { Component } from 'react';
import Menu from 'antd/es/menu';
import injectSheet from "react-jss";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Menus extends Component {
  handleClick = (e) => {
    this.props.history.push(e.key);
  };

  render() {
    const {classes, urlPath, items} = this.props;
    const menus = items.map((item) => <Menu.Item key={item.url}>{item.text}</Menu.Item>);
    return (
      <Menu className={classes.menu}
            mode="horizontal"
            defaultSelectedKeys={[urlPath]}
            onClick={this.handleClick}
      >
        {menus}
      </Menu>
    )
  }
};

const styles = {
  menu: {
    float: 'right',
    borderBottom: 'none',
  },
};

const mapStateToProps = (state, ) => {
  return {};
};


export default injectSheet(styles)(withRouter(connect(mapStateToProps)(Menus)));