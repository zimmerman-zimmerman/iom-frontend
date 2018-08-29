import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from "react-jss";

const BannerText = (props) => {
  const {classes, text} = props;
  return (
    <Grid fluid className={classes.bannerText}>
      <Row center="xs"  middle="xs">
        <Col xs={12} md={10} lg={10} className="content">
          <span className="title">{text}</span>
        </Col>
      </Row>
    </Grid>
  );
};

const styles = {
  bannerText: {
    backgroundColor: '#ececec',
    '& .content': {
      fontSize: 'calc(1.8em + 1vw)',
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