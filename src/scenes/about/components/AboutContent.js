import React from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Table from 'antd/es/table';
import Icon from 'antd/es/icon';

import aboutOMG from '../../../assets/images/AboutIOM.jpg';

const { Content } = Layout;

const AboutContent = () => {
  const columns = [{
    title: 'Document',
    dataIndex: 'document',
    key: 'document',
    width: '80%',
    render: text => <span>{text}</span>,
  }, {
    title: '',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;" className="ant-dropdown-link">
          <Icon type="download" />
        </a>
      </span>
    ),
  }];
  const data = [{
    key: '1',
    document: 'Document 1',
    link: 'link',
  }, {
    key: '2',
    document: 'Document 3',
    link: 'London No. 1 Lake Park',
  }, {
    key: '3',
    document: 'Document 3',
    link: 'link',
  }];
  return (
    <Layout>
      <Content className="Content Top">
        <Row>
          <Col span={12} offset={6}>
            <h2 className="Title">About IOM Transparency portal</h2>
            <p>
              <strong>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer ut mi neque. Nulla consectetur laoreet orci.
                Etiam consequat quam et magna consectetur pulvinar.
                Suspendisse bibendum nisi ex, nec finibus tortor ultricies quis.
                Curabitur lobortis augue velit, vel faucibus odio elementum et.
                Cras placerat consectetur libero, eu vestibulum magna posuere sed.
                Integer enim turpis, efficitur eget dignissim vel, lacinia eu magna.
              </strong>
            </p>
            <p>
              Ut placerat magna id diam hendrerit, a scelerisque massa rutrum.
              Pellentesque aliquet erat ut placerat tempor.
              Nulla quis leo consectetur, venenatis neque et, sodales arcu.
              Nullam at orci turpis. Etiam pulvinar nulla leo, ut tincidunt lacus suscipit at.
              Vestibulum elementum massa in laoreet tincidunt. Mauris et placerat erat.
            </p>
            <p>
              Curabitur quis felis finibus, vestibulum justo a, gravida magna.
              Aliquam id libero vitae dui elementum convallis. In at eros quam.
              Phasellus rhoncus, velit at aliquet convallis, quam ipsum sagittis orci,
              non pretium eros dui sit amet augue.
              Integer id lectus ac magna venenatis mollis.
              Integer sed massa venenatis, accumsan ligula id, mollis dolor.
              Fusce convallis at lacus vel tristique. Proin eu nibh euismod, semper erat lobortis, volutpat dolor.
              Praesent venenatis ipsum ut velit lacinia convallis.
              Aliquam elementum lorem eget ex iaculis vehicula ac nec libero.
              Aliquam euismod dolor at ipsum gravida feugiat.
            </p>
          </Col>
        </Row>
      </Content>
      <Content className="Content">
        <Row>
          <Col span={12} offset={6}>
            <img src={aboutOMG} width="100%" alt="IOM"/>
          </Col>
        </Row>
      </Content>
      <Content className="Content Top">
        <Row>
          <Col span={12} offset={6}>
            <p>
              Ut placerat magna id diam hendrerit, a scelerisque massa rutrum.
              Pellentesque aliquet erat ut placerat tempor. Nulla quis leo consectetur, venenatis neque et,
              sodales arcu. Nullam at orci turpis.
              Etiam pulvinar nulla leo, ut tincidunt lacus suscipit at.
              Vestibulum elementum massa in laoreet tincidunt. Mauris et placerat erat.
            </p>
            <p>
              Curabitur quis felis finibus, vestibulum justo a, gravida magna.
              Aliquam id libero vitae dui elementum convallis. In at eros quam.
              Phasellus rhoncus, velit at aliquet convallis, quam ipsum sagittis orci,
              non pretium eros dui sit amet augue. Integer id lectus ac magna venenatis mollis.
              Integer sed massa venenatis, accumsan ligula id, mollis dolor.
              Fusce convallis at lacus vel tristique.
              Proin eu nibh euismod, semper erat lobortis, volutpat dolor.
              Praesent venenatis ipsum ut velit lacinia convallis.
              Aliquam elementum lorem eget ex iaculis vehicula ac nec libero.
              Aliquam euismod dolor at ipsum gravida feugiat.
            </p>
          </Col>
        </Row>
      </Content>
      <Content className="Content Top">
        <Row>
          <Col span={12} offset={6}>
            <Table columns={columns} dataSource={data} pagination={false}/>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
};

export default AboutContent;