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
    const { data, classes, projectType, description } = this.props;
    const usd = <Trans id="currency.usd" defaultMessage="US$ " />;
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

      const budgetName = projectType ?
          <Trans id="service.banner.right.budget" defaultMessage="Total service budget"/> :
          <Trans id="service.banner.project.type.right.budget" defaultMessage="Total project budget"/>;

      const lines = [
        [
          {line: budgetName, className: 'financialLabel'},
          {line: <span>{usd}{format(',')(Math.round(get(data, 'value', 0)))}</span>, className: 'financialText'},
          {
            line: <Trans id="service.banner.right.incoming" defaultMessage="Total incoming funds"/>,
            className: 'financialLabel'
          },
          {line: <span>{usd}{format(',')(Math.round(get(data, 'incoming_fund', 0)))}</span>, className: 'financialText'},
          {line: <Trans id="service.banner.right.projects" defaultMessage="Project count"/>, className: 'financialLabel'},
          {line: <span>{get(data, 'activity_count', 0)}</span>, className: 'financialText'}
        ],
        [
          {
            line: <Trans id="service.banner.right.disbursements" defaultMessage="Total disbursements"/>,
            className: 'financialLabel'
          },
          {line: <span>{usd}{format(',')(Math.round(get(data, 'expenditure', 0)))}</span>, className: 'financialText'},
          {
            line: <Trans id="service.banner.right.expenditure" defaultMessage="Total expenditure"/>,
            className: 'financialLabel'
          },
          {line: <span>{usd}{Math.round(get(data, 'expenditure', 0))}</span>, className: 'financialText'},
          {line: <Trans id="service.banner.right.source.title" defaultMessage="Data source" />, className: 'financialLabel'},
          {line: <Trans id="service.banner.right.source" defaultMessage="IATI Registry" />, className: 'financialText'}
        ]
      ];
      return (
        <Row className={classes.bannerContent}>
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
      <Row className={classes.serviceBanner}
           style={ projectType ? {backgroundColor: '#f29d70'} : {backgroundColor: '#fdc973'} }>
        <Col xs={12} md={6} lg={6} className="left">
          <span className='title'>{data.sector.name}</span>
          <Menu className="menu" selectedKeys={['overview']} mode="horizontal">
            <Menu.Item key="overview">
              <Icon type="appstore"/>
              <Trans id="service.banner.left.menu.overview" defaultMessage="Overview"/>
            </Menu.Item>
            <Menu.Item key="related">
                <Icon type="book"/>
                <Trans id="service.banner.left.menu.detail" defaultMessage="detail report"/>
            </Menu.Item>
          </Menu>
          <div className="description">
            {description ? description : <Trans id="sector.not.found" defaultMessage="Not Found on Site"/>}
          </div>
        </Col>
        <Col xs={12} md={6} lg={6}  className="right">
          <span className={classes.financialTitle}>
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
    financialTitle:{
        fontSize: '32px',
        fontWeight: 600,
        color: '#fff',
      '@media (max-width: 767px)': {
        fontSize: '22px',
      },
    },
    bannerContent: {
        marginTop: 28,
    },
  serviceBanner: {
    width: '100%',
    marginLeft: 0,
    '& .left': {
      padding: '40px 35px 100px 30px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      backgroundColor: '#efefef',
      '& .title': {
        fontSize: 32,
        fontWeight: 600,
        color: '#1471ce',
        '@media (max-width: 767px)': {
          fontSize: '22px',
        },
      },
      '& .description': {
          lineHeight: '28px',
          marginTop: 40,
          color: '#1471ce',
          fontWeight: 600,
          fontSize: 21,
          '@media (max-width: 767px)': {
              fontSize: 16,
          },
      },
      '& .menu': {
        marginTop: 40,
        lineHeight: '30px',
        borderBottomStyle: 'none',
      },
      '& .menu li': {
        color: '#5d5d5d',
        padding: '0',
        marginRight: 20,
        fontSize: 22,
        textTransform: 'none',
        '@media (max-width: 767px)': {
          fontSize: '18px',
        },
      },
      '& .menu .ant-menu-item-selected': {
        color: '#1471ce',
        fontWeight: 'bold',
        borderBottom: '2px solid #1471ce !important',
      }
    },
    '& .right': {
      padding: '40px 30px 100px 65px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      color: 'white',
      fontWeight: 600,
        '& .financialLabel': {
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#fff',
          '@media (max-width: 767px)': {
            fontSize: '18px',
          },
        },
        '& .financialText':{
            marginBottom: '46px',
            fontSize: '28px',
            fontWeight: 'normal',
          '@media (max-width: 767px)': {
            fontSize: '18px',
          },
        },
      '& .title': {
        color: 'white',
        fontSize: 32,
      },
      '& .gap': {
        marginTop: 20,
        fontSize: 21,
      },
      '& .value': {
        fontSize: 26,
        fontWeight: 300,
      },
    }
  }
};

export default injectSheet(styles)(ServiceBanner);