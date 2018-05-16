import React, { Component } from 'react';
import Card from 'antd/es/card';
import Divider from 'antd/es/divider';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import { format } from "d3-format";
import { FormattedMessage } from "react-intl";

class Summary extends Component {
  render() {
    const { data } = this.props;
    let totalBudget = 0;
    let totalActivity = 0;
    if (data) {
      data.forEach(function (item) {
        totalBudget += item.value;
        totalActivity += item.activity_count;
      });
    }
    return (
      <Card className="ShadowBox" style={{height: 450}}>
        <h4><FormattedMessage id="countries.summary" defaultMessage="Summary"/></h4>
        <Divider className="Divider"/>
        <Row>
          <Col span={24}>
            {format(".2s")(totalBudget).replace(/G/, "B")}
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{color: '#959595', fontSize: 11}}>
            <FormattedMessage id="countries.summary.total" defaultMessage="Total budget"/>
          </Col>
        </Row>
        <Row style={{marginTop: 15}}>
          <Col span={24}>
            {totalActivity}
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{color: '#959595', fontSize: 11}}>
            <FormattedMessage id="countries.summary.projects" defaultMessage="Projects"/>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Summary;

