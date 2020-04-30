import React, { Fragment } from "react";
import injectSheet from "react-jss";
import Drawer from "antd-mobile/es/drawer";
import List from "antd-mobile/es/list";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../../Auth";

import { slider as sliderStyle } from "../../helpers/style";

const Slider = (props) => {
  const { classes, open, menuItems, onOpenChange, location } = props;
  const slashIndex = location.pathname.lastIndexOf("/");
  const sidebar = (
    <List>
      {menuItems.map((item, index) => {
        const className =
          item.url === location.pathname ||
          item.url === location.pathname.substr(0, slashIndex)
            ? "active"
            : "";
        return (
          <List.Item key={index} className={className}>
            <Link to={item.url}>
              <h3>{item.text}</h3>
            </Link>
          </List.Item>
        );
      })}
      <List.Item key={6}>
        <Link onClick={auth0Client.signOut} to="/">
          <h3>Sign Out</h3>
        </Link>
      </List.Item>
    </List>
  );
  return (
    <Fragment>
      <Drawer
        className={classes.slider}
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        open={open}
        sidebar={sidebar}
        onOpenChange={onOpenChange}
      >
        {props.children}
      </Drawer>
    </Fragment>
  );
};

const styles = {
  slider: {
    position: "relative",
    overflow: "auto",
    "-webkit-overflow-scrolling": "touch",
    "& h3": {
      margin: "5px 0",
    },
    "& .am-list-item": {
      paddingLeft: 20,
    },
    "& .am-drawer-sidebar": {
      backgroundColor: "white",
      overflow: "auto",
      "-webkit-overflow-scrolling": "touch",
    },
    "& .am-drawer-sidebar .am-list": {
      width: sliderStyle.width,
      padding: 0,
    },
    "& .active": {
      backgroundColor: "#e9ebf6",
      borderLeft: "8px solid #0033a1",
      paddingLeft: "12px !important",
    },
  },
};

export default injectSheet(styles)(withRouter(Slider));
