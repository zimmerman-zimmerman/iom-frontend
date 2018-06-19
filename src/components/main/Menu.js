import React from 'react';
import * as AntMenu from 'antd/es/menu';
import injectSheet from "react-jss";

const Menu = (props) => {
  const { classes, urlPath, items } = props;
  const menus = items.map((item) => <AntMenu.Item key={item.url}>{item.text}</AntMenu.Item>);
  return (
    <AntMenu className={classes.menu}
          mode="horizontal"
          defaultSelectedKeys={[urlPath]}
    >
      {menus}
    </AntMenu>
  )
};

const styles = {
  menu: {
    float: 'right',
    borderBottom: 'none',
  },
};


export default injectSheet(styles)(Menu);