import React, { Component } from 'react';
import { Card, Divider, Row, Col } from 'antd';
import d3 from "d3/d3";

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
        <h4>Summary</h4>
        <Divider className="Divider"/>
        <Row>
          <Col span={24}>
            {d3.format(".2s")(totalBudget).replace(/G/, "B")}
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{color: '#959595', fontSize: 11}}>
            Total budget
          </Col>
        </Row>
        <Row style={{marginTop: 15}}>
          <Col span={24}>
            {totalActivity}
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{color: '#959595', fontSize: 11}}>
            Projects
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Summary;

