import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from "react-jss";

const BannerText = (props) => {
  const {classes, text} = props;
  return (
    <Grid fluid className={classes.bannerText}>
      <Row center="xs"  middle="xs">
        <Col xs={12} md={10} lg={10} className="content">
          <span className={classes.title}>{text}</span>
        </Col>
      </Row>
    </Grid>
  );
};

const styles = {
  title: {
    fontFamily: "Open Sans",
    fontSize: '28px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.36,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#1f4283',
    '@media (maxWidth: 767px)': {
      fontSize: '22px',
    },
  },
  bannerText: {
    backgroundColor: '#ececec',
    '& .content': {
      fontStyle: 'normal',
      fontStretch: 'normal',
      fontWeight: 300,
      letterSpacing: 'normal',
      color: '#0033a1',
      padding: 'calc(1em + 1vw) 0',
    }
  }
};

export default injectSheet(styles)(BannerText);