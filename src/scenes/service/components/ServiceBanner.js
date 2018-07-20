import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import get from 'lodash/get';
import { format } from 'd3-format';
import injectSheet from 'react-jss';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import ReactTooltip from 'react-tooltip';

import Trans from '../../../locales/Trans';

class ServiceBanner extends Component {
  render() {
    const { data, classes } = this.props;
    const usd = <Trans id="currency.usd.symbol" defaultMessage="$" />;
    const Line = (props) => {
      return (
        <Row className={props.className}>
          <Col xs={12}>
            {props.children}
          </Col>
        </Row>
      )
    }
    const RightColumn = () => {
      const lines = [
        [
          {line: <Trans id="service.banner.right.budget" defaultMessage="Total project budget"/>, className: 'field'},
          {line: <span>{usd}{format(',')(get(data, 'value', 0))}</span>},
          {
            line: <Trans id="service.banner.right.incoming" defaultMessage="Total incoming funds"/>,
            className: 'field'
          },
          {line: <span>{usd}{format(',')(get(data, 'incoming_fund', 0))}</span>},
          {line: <Trans id="service.banner.right.projects" defaultMessage="Project count"/>, className: 'field'},
          {line: <span>{get(data, 'activity_count', 0)}</span>}
        ],
        [
          {
            line: <Trans id="service.banner.right.disbursements" defaultMessage="Total disbursements"/>,
            className: 'field'
          },
          {line: <span>{usd}{format(',')(get(data, 'expenditure', 0))}</span>},
          {
            line: <Trans id="service.banner.right.expenditure" defaultMessage="Total expenditure"/>,
            className: 'field'
          },
          {line: <span>{usd}{get(data, 'expenditure', 0)}</span>},
          {line: <Trans id="service.banner.right.source.title" defaultMessage="Data source" />, className: 'field'},
          {line: <Trans id="service.banner.right.source" defaultMessage="IATI Registry" />}
        ]
      ];
      return (
        <Row>
          {
            lines.map((items, index) => {
              return (
                <Col xs={12} md={6} lg={6} key={index}>
                  {
                    items.map((item, key) => {
                      return (
                        <Line className={get(item, 'className')} key={key}>
                          {item.line}
                        </Line>
                      )
                    })
                  }
                </Col>
              )
            })
          }
        </Row>
      )
    };
    return (
      <Row className={classes.serviceBanner}>
        <Col xs={12} md={6} lg={6} className="left">
          <span className='title'>{data.sector.name}</span>
          <Menu className="menu" selectedKeys={['overview']} mode="horizontal">
            <Menu.Item key="overview">
              <Icon type="appstore"/>
              <Trans id="service.banner.left.menu.overview" defaultMessage="Overview"/>
            </Menu.Item>
            <Menu.Item key="related">
              <span data-tip="Under construction" data-effect="solid" data-place="top" data-type="light">
                <Icon type="book"/>
                <Trans id="service.banner.left.menu.detail" defaultMessage="detail report"/>
              </span>
            </Menu.Item>
          </Menu>
          <div className="description">
            <Trans id="service.banner.left.description" defaultMessage="General description provided by IOM."/>
          </div>
        </Col>
        <Col xs={12} md={6} lg={6}  className="right">
          <span className="title">
            <Trans id="service.banner.right.title" defaultMessage="Financial overview" />
          </span>
          <RightColumn data={data} />
        </Col>
        <ReactTooltip/>
      </Row>
    )
  }
}

const styles = {
  serviceBanner: {
    '& .title': {
      fontSize: 25,
    },
    '& .left': {
      backgroundColor: '#efefef',
      color: '#1471ce',
      padding: '20px 60px',
      '@media (max-width: 767px)': {
        padding: '20px 35px'
      },
      '& .menu li': {
        color: '#5d5d5d',
      },
      '& .menu .ant-menu-item-selected': {
        color: '#35b6b4'
      },
      '& .description': {
        marginTop: 20,
        color: '#1471ce',
        fontWeight: 600,
      }
    },
    '& .right': {
      backgroundColor: '#f27f6d',
      color: 'white',
      padding: '20px 60px',
      fontWeight: 600,
      '@media (max-width: 767px)': {
        padding: '20px 35px'
      },
      '& .field': {
        marginTop: 20,
      }
    },
  }
};

export default injectSheet(styles)(ServiceBanner);