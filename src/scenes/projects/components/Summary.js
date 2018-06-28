import React, { Component } from 'react';
import Card from 'antd/es/card';
import Divider from 'antd/es/divider';
import { Row, Col } from 'react-flexbox-grid';
import { format } from "d3-format";
import { FormattedMessage } from "react-intl";
import injectSheet from 'react-jss';
import Button from 'antd/es/button';
import get from 'lodash/get';

class Summary extends Component {
  render() {
    const { data, classes } = this.props;
    let totalBudget = 0;
    let totalActivity = 0;
    if (data) {
      data.forEach(function (item) {
        totalBudget += get(item,'budgets[0].value.value', 0);
        totalActivity += 1;
      });
    }
    const usd = <FormattedMessage id="currency.usd.symbol" defaultMessage="$" />;
    return (
      <Card className="ShadowBox" style={{height: 450}}>
        <h3><strong><FormattedMessage id="countries.summary" defaultMessage="Summary"/></strong></h3>
        <Divider className="Divider"/>
        <Button size="small" type="primary" ghost className={classes.buttonHide} onClick={this.props.onHideSummary}>
          <FormattedMessage id="countries.summary.hide" defaultMessage="Hide"/>
        </Button>
        <Row>
          <Col xs={12}>
            <strong>{usd}{format(".2s")(totalBudget).replace(/G/, "B")}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{color: '#959595', fontSize: 11}}>
            <FormattedMessage id="countries.summary.total" defaultMessage="Total budget"/>
          </Col>
        </Row>
        <Row style={{marginTop: 15}}>
          <Col xs={12}>
            <strong>{totalActivity}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{color: '#959595', fontSize: 11}}>
            <FormattedMessage id="countries.summary.projects" defaultMessage="Projects"/>
          </Col>
        </Row>
      </Card>
    )
  }
}

const styles = {
  summary: {
    marginTop: 15,
    '& .leaflet-control-attribution.leaflet-control': {
      display: 'none',
    },
  },
  buttonHide: {
    position: 'absolute',
    right: 20,
    top: 25,
  }
};

export default injectSheet(styles)(Summary);

