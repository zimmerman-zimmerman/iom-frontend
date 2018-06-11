import React from 'react';
import injectSheet from "react-jss";
import { Grid, Row, Col } from 'react-flexbox-grid';

import { variables as styleVariables } from '../helpers/style';

const MainFooter =  (props) => {
  const { classes } = props;
  return (
    <Grid fluid className={classes.footer}>
    </Grid>
  )
};

const styles = {
  footer: {
    backgroundColor: styleVariables.blue,
  },
};

export default injectSheet(styles)(MainFooter);