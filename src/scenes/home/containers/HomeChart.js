import React, { Fragment } from 'react';
import {injectIntl, intlShape} from 'react-intl';
import { Row, Col } from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';
import injectSheet from "react-jss";

import {size as screenSize} from '../../../helpers/screen';
import PieRadialChart from '../components/PieRadialChart';

const HomeChart = (props) => {
  const { data, title, intl } = props;
  const colors = ['#0033a1', '#f29d70', '#fac878', '#f27f6d', '#54c8c3'];
  const fillColor = '#8884d8';
  const prefixLegend = intl.formatMessage({id: 'currency.usd', defaultMessage: 'USD'});
  return (
    <Fragment>
      <Row start="xs" center="xs">
        <Col xs={12}>
          {title} {title}
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={12}>
          <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
            <PieRadialChart widthDivider={1.5} fillColor={fillColor} prefixLegend={prefixLegend} data={data}
                            colors={colors}
            />;
          </MediaQuery>
          <MediaQuery minWidth={screenSize.tablet.minWidth} >
            <PieRadialChart widthDivider={3} fillColor={fillColor} prefixLegend={prefixLegend} data={data}
                            colors={colors}
            />;
          </MediaQuery>
        </Col>
      </Row>
    </Fragment>
  )
};

HomeChart.propTypes = {
  intl: intlShape.isRequired
};

const styles = {
  menus: {
    float: 'right',
    borderBottom: 'none',
  },
};


export default injectSheet(styles)(injectIntl(HomeChart));