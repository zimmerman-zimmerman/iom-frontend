import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from "react-jss";
import { Link } from 'react-router-dom';

import ArrowRight from '../../icons/ArrowRight';

import { breadcrumbs as styleBreadcrumbs } from '../../helpers/style';
import './styles/Breadcrumbs.scss';


const Breadcrumbs = (props) => {
  const { classes, items, size } = props;
  const breadcrumbs = items.map((item) =>
    <Breadcrumb.Item key={item.url} className={!item.url ? classes.active : classes.noActive}>
      {item.url ? <Link className='breadcrumb-link' to={item.url}>{item.text}</Link> : item.text}
    </Breadcrumb.Item>
  );
  return (
    <Grid fluid className={classes.border}>
      <Row middle={size} className={classes.row}>
        <Col md={12} lg={12}>
          <Breadcrumb className='one-breadcrumb' separator={<ArrowRight className={classes.separator} />}>
            {breadcrumbs}
          </Breadcrumb>
        </Col>
      </Row>
    </Grid>
  )
};

const styles = {
  separator: {
    height: 12,
      width: 12,
      verticalAlign: '-1px',
  },
  border: {
    marginTop: styleBreadcrumbs.marginTop,
    borderBottom: styleBreadcrumbs.border,
      paddingLeft: '30px !important',
      paddingRight: '30px !important',
  },
  row: {
    height: styleBreadcrumbs.height,
  },
  noActive: {
    color: styleBreadcrumbs.color,
    fontSize: styleBreadcrumbs.sizeFont,
  },
  active: {
    color: styleBreadcrumbs.colorActive,
    fontSize: styleBreadcrumbs.sizeFont,
  }
};

export default injectSheet(styles)(Breadcrumbs);