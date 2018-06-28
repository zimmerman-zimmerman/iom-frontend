import React, { Component } from 'react';
import Card from 'antd/es/card';
import Divider from 'antd/es/divider';
import { Row, Col } from 'react-flexbox-grid';
import { format } from "d3-format";
import injectSheet from 'react-jss';
import Button from 'antd/es/button';
import get from 'lodash/get';
import PropsType from 'prop-types';

import Trans from '../../../locales/Trans';

class Summary extends Component {
  render() {
    const { data, fieldValue, fieldCount, onHideSummary, classes } = this.props;
    let totalBudget = 0;
    let totalActivity = 0;
    if (data) {
      data.forEach(function (item) {
        totalBudget += get(item, fieldValue, 0);
        totalActivity += get(item, fieldCount, 1);
      });
    }
    const usd = <Trans id="currency.usd.symbol" defaultMessage="$" />;
    return (
      <Card className={classes.summary}>
        <h3><strong><Trans id="summary.title" defaultMessage="Summary"/></strong></h3>
        <Divider className="Divider"/>
        <Button size="small" type="primary" ghost className="button-hide" onClick={onHideSummary}>
          <Trans id="summary.hide" defaultMessage="Hide"/>
        </Button>
        <Row>
          <Col xs={12}>
            <strong>{usd}{format(".2s")(totalBudget).replace(/G/, "B")}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="field">
            <Trans id="summary.budget" defaultMessage="Total budget"/>
          </Col>
        </Row>
        <Row className="gap-row">
          <Col xs={12}>
            <strong>{totalActivity}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="field">
            <Trans id="summary.projects" defaultMessage="Projects"/>
          </Col>
        </Row>
      </Card>
    )
  }
}

Summary.propTypes = {
  data: PropsType.array,
  fieldValue: PropsType.string,
  fieldCount: PropsType.string,
  onHideSummary: PropsType.func
};


const styles = {
  summary: {
    '& .leaflet-control-attribution.leaflet-control': {
      display: 'none',
    },
    height: 450,
    '& .field': {
      color: '#959595',
      fontSize: 11
    },
    '& .button-hide': {
      position: 'absolute',
      right: 20,
      top: 25,
    },
    '& .gap-row': {
      marginTop: 15
    }
  }
};

export default injectSheet(styles)(Summary);

