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
            <Col xs={12} md={6} lg={5}>
              <Card className={classes.card}>
                <span className={classes.title}>{title}</span>
                <span className={classes.description}>{description}</span><br /><br />
                {size === 'lg' ? <span className={classes.detail}>{detail}</span> : null}
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
    fontSize: 44,
    fontWeight: 300,
    display: 'block',
    height: 'fit-content',
    '@media (max-width: 768px)': {
      fontSize: 26,
    }
  },
  description: {
    fontSize: 21,
    fontWeight: 300,
    '@media (max-width: 768px)': {
      fontSize: 16,
    }
  },
  detail: {
    fontSize: 21,
    fontWeight: 300,
    '@media (max-width: 768px)': {
      fontSize: 16,
    }
  }
};

export default injectSheet(styles)(BannerImage);