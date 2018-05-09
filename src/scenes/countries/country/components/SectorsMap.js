import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Label }  from 'bizcharts';
import DataSet from '@antv/data-set';
import { Layout, Row, Col } from 'antd';
import { FormattedMessage } from "react-intl";

class SectorsMap extends Component {
  render() {
    const { sectors } = this.props;
    const items = [];
    let total = 0;
    sectors.forEach((item) => {
      items.push({name: item.sector.name, value: item.value});
      total += item.value;
    });
    const { DataView } = DataSet;
    const data = {
      name: 'root',
      children: items
    };
    const dv = new DataView();
    dv.source(data, {
      type: 'hierarchy',
    }).transform({
      field: 'value',
      type: 'hierarchy.treemap',
      tile: 'treemapResquarify',
      as: ['x', 'y'],
    });
    const nodes = dv.getAllNodes();
    nodes.map(node => {
      node.name = node.data.name;
      node.value = node.data.value;
      return node;
    });
    const scale = {
      value:{nice:false}
    };
    const htmlStr = '<li data-index={index}>'
      + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
      + '{name}<br/>'
      + '<span style="padding-left: 16px">{count}</span><br/>'
      + '</li>';

    return(
      <Row className="SectorsMap">
        <Col span={24}>
          <h3 className="Title">
            <FormattedMessage id="country.sectors.map.title" defaultMessage="Explore what sectors the funds go to"/>
          </h3>
          <Layout style={{marginLeft: -80}}>
            <Chart data={nodes} forceFit={true} height={400} scale={scale}>
              <Tooltip showTitle={false} itemTpl={htmlStr}/>
              <Geom type='polygon' position='x*y' color='name' tooltip={['name*value', (name, count)=>{
                return {
                  name,
                  count,
                }
              }]} style={{lineWidth:1, stroke:"#fff"}}>
                <Label content="name" offset={0}
                       textStyle={{textBaseline:'middle', fontSize: 15}}
                       formatter={(val, obj)=>{
                         if(val !== 'root') {
                           const percent = (obj.point.data.value/total * 100/100) * 100;
                           return val.toString().concat(' ', percent, '%');
                         }
                       }}
                />
              </Geom>
            </Chart>
          </Layout>
        </Col>
      </Row>
    )
  }
}

export default SectorsMap;