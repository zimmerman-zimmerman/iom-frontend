import React, { Component } from 'react';
import Card from 'antd/es/card';
import Divider from 'antd/es/divider';
import { Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';
import Button from 'antd/es/button';
import get from 'lodash/get';
import PropsType from 'prop-types';

import Trans from '../../../locales/Trans';

import { formatNumberComma } from '../../../helpers/generic';

class Summary extends Component {
  render() {
    const { data, fieldValue, fieldCount, onHideSummary, donorsCount, classes } = this.props;
    let totalBudget = 0;
    let totalActivity = 0;
    if (data) {
      data.forEach(function (item) {
        totalBudget += get(item, fieldValue, 0);
        totalActivity += get(item, fieldCount, 1);
      });
    }
    const usd = <Trans id="currency.usd" defaultMessage="US$ " />;
    return (
      <Card className={classes.summary}>
        <h3><strong className={classes.title}><Trans id="summary.title" defaultMessage="Summary"/></strong></h3>
        <Divider className="Divider"/>
        <Button size="small" type="primary" ghost className="button-hide" onClick={onHideSummary}>
          <Trans id="summary.hide" defaultMessage="Hide"/>
        </Button>
        <Row>
          <Col xs={12}>
            <strong className={classes.number}>{usd}{formatNumberComma(totalBudget)}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={classes.numberLabel}>
            <Trans id="summary.budget" defaultMessage="total budget"/>
          </Col>
        </Row>
        <Row className="gap-row">
          <Col xs={12}>
            <strong className={classes.number}>{totalActivity}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={classes.numberLabel}>
            <Trans id="summary.projects" defaultMessage="projects"/>
          </Col>
        </Row>
        <Row className="gap-row">
          <Col xs={12}>
            <strong className={classes.number}>{donorsCount}</strong>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={classes.numberLabel}>
            <Trans id="summary.donors" defaultMessage="donors"/>
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
  onHideSummary: PropsType.func,
  donorsCount: PropsType.number,
};


const styles = {
    title: {
        color: '#262626',
        fontSize: '18px',
    },
  number: {
      color: '#262626',
      fontSize: '14px',
  },
    numberLabel: {
        color: '#262626',
        fontSize: '10px',
    },
  summary: {
    '& .ant-card-body': {
      padding: 12,
    },
    borderLeftStyle: 'none',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    '& .leaflet-control-attribution.leaflet-control': {
      display: 'none',
    },
    height: 450,
    '& h3': {
      marginBottom: 0,
      fontWeight: 'bold',
    },
    '& .field': {
      color: '#959595',
      fontSize: 11
    },
    '& .button-hide': {
      position: 'absolute',
      borderRadius: 2,
      right: 12,
      top: 12,
    },
    '& .gap-row': {
      marginTop: 15
    }
  }
};

export default injectSheet(styles)(Summary);

