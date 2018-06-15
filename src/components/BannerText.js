import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from "react-jss";

const BannerText = (props) => {
  const {classes, text} = props;
  return (
    <Grid fluid className={classes.bannerText}>
      <Row center="xs" className={classes.content}>
        <Col xs={10} md={8} lg={8}>
          <h2>{text}</h2>
        </Col>
      </Row>
    </Grid>
  );
};

const styles = {
  bannerText: {
    backgroundColor: '#f4f4f4',
    '& h2': {
      paddingTop: 15,
      color: '#0033a1',
    }
  }
};

export default injectSheet(styles)(BannerText);