import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import Drawer from  'antd-mobile/es/drawer';
import List from 'antd-mobile/es/list';
import { Link } from 'react-router-dom';

import { slider as sliderStyle } from '../../helpers/style'

const Slider = (props) => {
  const { classes, open, menuItems, onOpenChange } = props;
  const sidebar = (
    <List>{menuItems.map((item, index) => {
      return (<List.Item key={index}><Link to={item.url}><h2>{item.text}</h2></Link></List.Item>)})}
    </List>
  );
  return (
    <Fragment>
      <Drawer className={classes.slider}
              style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              open={open}
              sidebar={sidebar}
              onOpenChange={onOpenChange}
      >
        {props.children}
      </Drawer>
    </Fragment>
  )
};

const styles = {
  slider: {
    position: 'relative',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '& .am-drawer-sidebar': {
      backgroundColor: 'white',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch',
    },
    '& .am-drawer-sidebar .am-list': {
      width: sliderStyle.width,
      padding: 0,
    }
  }
};

export default injectSheet(styles)(Slider);