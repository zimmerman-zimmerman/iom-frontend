import React from 'react';
import injectSheet from "react-jss";
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from 'antd/es/card';

const BannerImage = (props) => {
  const { classes, image, height, title, description, detail, size } = props;
  return (
    <Grid fluid className={classes.banner} style={{backgroundImage: `url(${image})`, height: height}}>
      <Row middle="xs" style={{height: height}}>
        <Col xs={12} md={12} lg={12}>
          <Row>
            <Col xs={9} md={6} lg={6}>
              <Card className={classes.card}>
                <span className={classes.title}>{title}</span><br />
                <span className={classes.description}>{description}</span><br /><br />
                <span className={classes.detail}>{detail}</span>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
};

const styles = {
  banner: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '-webkit-backface-visibility': 'hidden',
    '-webkit-transform': 'translate3d(0,0,0)'
  },
  card: {
    background: 'rgba(0, 51, 161, .7)',
    border: 'none',
    color: 'white',
  },
  title: {
    fontSize: 'calc(1em + 1vw)',
  },
  description: {
    fontSize: 'calc(0.5em + 1vw)',
  },
  detail: {
    fontSize: 'calc(0.25em + 1vw)',
  }
};

export default injectSheet(styles)(BannerImage);