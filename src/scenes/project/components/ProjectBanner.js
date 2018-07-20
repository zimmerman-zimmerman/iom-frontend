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
  const usd = <Trans id="currency.usd.symbol" defaultMessage="$" />;
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
        {line: <Trans id="project.banner.right.budget" defaultMessage="Total activity budget"/>, className: 'gap'},
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.budget_value', 0))}</span>},
        {
          line: <Trans id="project.banner.right.incoming" defaultMessage="Total incoming funds"/>,
          className: 'gap'
        },
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.incoming_commitment_value', 0))}</span>},
        {line: <Trans id="project.banner.right.start" defaultMessage="Start date"/>, className: 'gap'},
        {line: <span>{get(data, 'activity_dates[1].iso_date', '-')}</span>}
      ],
      [
        {
          line: <Trans id="project.banner.right.disbursement" defaultMessage="Total disbursements"/>,
          className: 'gap'
        },
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.disbursement_value', 0))}</span>},
        {
          line: <Trans id="project.banner.right.expenditures" defaultMessage="Total expenditure"/>,
          className: 'gap'
        },
        {line: <span>{usd}{format(',')(get(data, 'aggregations.activity.expenditure_value', 0))}</span>},
        {line: <Trans id="project.banner.right.end" defaultMessage="End date" />, className: 'gap'},
        {line: <span>{get(data, 'activity_dates[2].iso_date', '-')}</span>}
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
        <span className="title">
          <Trans id="project.banner.right.title" defaultMessage="Financial overview"/>
        </span>
        <RightColumn data={data} />
      </Col>
      <ReactTooltip />
    </Row>
  )
};

const styles = {
  projectBanner: {
    '& .left': {
      padding: '20px 60px',
      '@media (max-width: 767px)': {
        padding: '20px 35px'
      },
      backgroundColor: '#efefef',
      '& .title': {
        fontSize: 25,
      },
      '& .description': {
        marginTop: 20,
        color: '#1471ce',
        fontWeight: 600,
      },
      '& .menu li': {
        color: '#5d5d5d',
      },
      '& .menu .ant-menu-item-selected': {
        color: '#35b6b4'
      }
    },
    '& .right': {
      padding: '20px 65px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      backgroundColor: '#f27f6d',
      color: 'white',
      fontWeight: 600,
      '& .title': {
        color: 'white',
        fontSize: 25,
      },
      '& .gap': {
        marginTop: 20,
      }
    }
  }
};


export default injectSheet(styles)(ProjectBanner);