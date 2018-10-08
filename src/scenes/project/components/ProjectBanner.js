import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import get from 'lodash/get';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import { format } from "d3-format";
import injectSheet from 'react-jss';
import ReactTooltip from 'react-tooltip';

import Trans from '../../../locales/Trans';

const ProjectBanner= (props) => {
  const { data, classes, key } = props;
  const usd = <Trans id="currency.usd" defaultMessage="US$ " />;
  const Line = (props) => {
    return (
      <Row className={props.className} key={key}>
        <Col xs={12}>
          {props.children}
        </Col>
      </Row>
    )
  };
  const RightColumn = () => {
    const lines = [
      [
        {line: <Trans id="project.banner.right.budget" defaultMessage="Total activity budget"/>, className: 'financialLabel'},
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.budget_value', 0))}</span>, className: 'financialText'},
        {
          line: <Trans id="project.banner.right.incoming" defaultMessage="Total incoming funds"/>,
          className: 'financialLabel'
        },
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.incoming_commitment_value', 0))}</span>, className: 'financialText'},
        {line: <Trans id="project.banner.right.start" defaultMessage="Start date"/>, className: 'financialLabel'},
        {line: <span>{get(data, 'activity_dates[1].iso_date', '-')}</span>, className: 'financialText'}
      ],
      [
        {
          line: <Trans id="project.banner.right.disbursement" defaultMessage="Total disbursements"/>,
          className: 'financialLabel'
        },
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.disbursement_value', 0))}</span>, className: 'financialText'},
        {
          line: <Trans id="project.banner.right.expenditures" defaultMessage="Total expenditure"/>,
          className: 'financialLabel'
        },
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.expenditure_value', 0))}</span>, className: 'financialText'},
        {line: <Trans id="project.banner.right.end" defaultMessage="End date" />, className: 'financialLabel'},
        {line: <span>{get(data, 'activity_dates[2].iso_date', '-')}</span>, className: 'financialText'}
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
    <Row className={classes.projectBanner}>
      <Col xs={12} md={6} lg={6} className="left">
        <span className="title">{get(data, 'title.narratives[0].text', 'Title')}</span>
        <Menu className="menu" selectedKeys={['overview']} mode="horizontal">
          <Menu.Item key="overview">
            <Icon type="appstore"/>
            <Trans id="project.banner.left.menu.overview" defaultMessage="Overview"/>
          </Menu.Item>
          <Menu.Item key="related">
            <span data-tip="Under construction" data-effect="solid" data-place="top" data-type="light">
              <Icon type="book"/>
              <Trans id="project.banner.left.menu.detail" defaultMessage="Detail report"/>
            </span>
          </Menu.Item>
        </Menu>
        <div className="description">{get(data, 'descriptions[0].narratives[0].text', 'Descriptions')}</div>
      </Col>
      <Col xs={12} md={6} lg={6}  className="right">
        <span className={classes.financialTitle}>
          <Trans id="project.banner.right.title" defaultMessage="Financial overview"/>
        </span>
        <RightColumn data={data} />
      </Col>
      <ReactTooltip />
    </Row>
  )
};

const styles = {
    financialTitle:{
        fontSize: '32px',
        fontWeight: 600,
        color: '#fff',
      '@media (max-width: 767px)': {
        fontSize: 22,
      },
    },
  projectBanner: {
    width: '100%',
    marginLeft: 0,
    '& .left': {
      padding: '40px 35px 100px 135px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      backgroundColor: '#efefef',
      '& .title': {
        fontWeight: 600,
        fontSize: 32,
        color: '#1471ce',
        '@media (max-width: 767px)': {
          fontSize: 22,
        },
      },
      '& .description': {
        marginTop: 40,
        color: '#1471ce',
        fontWeight: 500,
        fontSize: 20,
        '@media (max-width: 767px)': {
          fontSize: 16,
        },
      },
      '& .countryLink': {
        fontSize: 21,
        marginTop: 30,
        paddingLeft: 9,
        '@media (max-width: 767px)': {
          fontSize: 16,
        },
      },
      '& .menu': {
        marginTop: 20,
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
          fontSize: 16,
        },
      },
      '& .menu .ant-menu-item-selected': {
        color: '#1471ce',
        fontWeight: 'bold',
        borderBottom: '2px solid #1471ce !important',
        '@media (max-width: 767px)': {
          fontSize: 16,
        },
      }
    },
    '& .right': {
      padding: '40px 65px 100px 65px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      backgroundColor: '#f27f6d',
      color: 'white',
      fontWeight: 600,
        '& .financialLabel': {
            marginTop: '24px',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#fff',
          '@media (max-width: 767px)': {
            fontSize: 16,
          },
        },
        '& .financialText':{
            fontSize: '28px',
            fontWeight: 'normal',
          '@media (max-width: 767px)': {
            fontSize: 16,
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


export default injectSheet(styles)(ProjectBanner);