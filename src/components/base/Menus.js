import React from 'react';
import Menu from 'antd/es/menu';
import injectSheet from "react-jss";

const Menus = (props) => {
  const { classes, urlPath, items } = props;
  const menus = items.map((item) => <Menu.Item key={item.url}>{item.text}</Menu.Item>);
  return (
    <Menu className={classes.menu}
             mode="horizontal"
             defaultSelectedKeys={[urlPath]}
    >
      {menus}
    </Menu>
  )
};

const styles = {
  menu: {
    float: 'right',
    borderBottom: 'none',
  },
};


export default injectSheet(styles)(Menus);