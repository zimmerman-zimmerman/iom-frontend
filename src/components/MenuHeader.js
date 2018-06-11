import React from 'react';
import Menu from 'antd/es/menu';
import injectSheet from "react-jss";
import { FormattedMessage } from "react-intl";

const MenuHeaders = (props) => {
  const { classes, urlPath, items } = props;
  const menus = items.map((item) =>
    <Menu.Item key={item.key}>
      <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
    </Menu.Item>
  );
  return (
    <Menu className={classes.menus}
          mode="horizontal"
          defaultSelectedKeys={[urlPath]}
    >
      {menus}
    </Menu>
  )
};

const styles = {
  menus: {
    float: 'right',
    borderBottom: 'none',
  },
};


export default injectSheet(styles)(MenuHeaders);