import React, { Fragment } from 'react';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import ReactCountryFlag from "react-country-flag";
import { format } from "d3-format";
import { Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';
import get from 'lodash/get';
import {injectIntl, intlShape} from "react-intl";

import Trans from '../../../locales/Trans';

const BannerCountry = (props) => {
  const { data, classes, key, intl } = props;
  const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
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
        {line: <Trans id="country.banner.right.total.budget" defaultMessage="Total project budget"/>, className: 'financialLabel'},
        {line: <span>{usd}{format(',')(data.value)}</span>, className: 'financialText'},
        {
          line: <Trans id="country.banner.right.total.incoming" defaultMessage="Total incoming funds" />,
          className: 'financialLabel'
        },
        {line: <span>{usd}{format(',')(data.incoming_fund)}</span>, className: 'financialText'},
        {line: <Trans id="country.banner.right.activity.count" defaultMessage="Activity count"/>, className: 'financialLabel'},
        {line: <span>{format(',')(data.activity_count)}</span>, className: 'financialText'}
      ],
      [
        {
          line: <Trans id="country.banner.right.total.disbursements" defaultMessage="Total disbursements"/>,
          className: 'financialLabel'
        },
        {line: <span>{usd}{format(',')(data.disbursement)}</span>, className: 'financialText'},
        {
          line: <Trans id="country.banner.right.total.expenditure" defaultMessage="Total expenditure"/>,
          className: 'financialLabel'
        },
        {line: <span>{usd}{format(',')(data.expenditure)}</span>, className: 'financialText'},
        {line: <Trans id="country.banner.right.data.source" defaultMessage="Data source" />, className: 'financialLabel'},
        {line: <Trans id="country.banner.right.data.source.iati.registry" defaultMessage="IATI Registry" />, className: 'financialText'}
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
    <Fragment>
      <Row className={classes.bannerCountry}>
        <Col xs={12} md={6} lg={6} className="left">
          {data ?
            <Fragment>
              <span className="country">
                <ReactCountryFlag code={data.recipient_country.code} svg/>
                <span className="name">
                  {data.recipient_country.name}
                </span>
              </span>
              <Menu className="menu" selectedKeys={['overview']} mode="horizontal">
                <Menu.Item key="overview">
                  <Icon type="appstore"/>
                  <Trans id="country.banner.overview" defaultMessage="Overview"/>
                </Menu.Item>
                <Menu.Item key="related">
                  <Icon type="book"/>
                  <Trans id="country.banner.related" defaultMessage="Related projects"/>
                </Menu.Item>
              </Menu>
              <Row className="description">
                <Col span={24}>
                  {
                    data.recipient_country.description ?
                      <div dangerouslySetInnerHTML={{__html: data.recipient_country.description}} /> :
                      <Trans id='country.not.found' text='Not found on site' />
                  }
                  </Col>
              </Row>
              <Row>
                <Col span={24} className="countryLink">
                  <a href={`https://www.iom.int/countries/${data.recipient_country.code.toLowerCase()}`} target="_blank">
                    https://www.iom.int/countries/{data.recipient_country.code.toLowerCase()}
                  </a>
                </Col>
              </Row>
            </Fragment> : null
          }
        </Col>
        <Col xs={12} md={6} lg={6}  className="right">
          {data ?
            <Fragment>
              <span className={classes.financialTitle}>
                <Trans id="project.banner.right.title" defaultMessage="Financial overview"/>
              </span>
              <RightColumn data={data} />
            </Fragment> : null
          }
        </Col>
      </Row>
    </Fragment>
  )
};

const styles = {
  financialTitle:{
    fontSize: '32px',
      fontWeight: 600,
      color: '#fff',
    '@media (max-width: 767px)': {
      fontSize: '22px',
    },
  },
  bannerCountry: {
    width: '100%',
    marginLeft: 0,
    '& .left': {
      padding: '40px 137px 100px 137px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      backgroundColor: '#efefef',
      '& .country': {
        fontSize: 48,
        '& .name': {
          margin: '3px 10px',
          color: '#1471ce',
          '@media (max-width: 767px)': {
            fontSize: '22px',
          },
        }
      },
      '& .description': {
        marginTop: 20,
        color: '#1471ce',
        fontWeight: 600,
        fontSize: 21,
        paddingLeft: 9,
        '@media (max-width: 767px)': {
          fontSize: '16px',
        },
      },
      '& .countryLink': {
        fontSize: 21,
        marginTop: 30,
        paddingLeft: 9,
        '@media (max-width: 767px)': {
          fontSize: '16px',
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
      padding: '55px 65px 100px 65px',
      '@media (max-width: 767px)': {
        padding: '20px 25px'
      },
      backgroundColor: '#54c8c3',
      color: 'white',
      fontWeight: 600,
      '& .title': {
        color: 'white',
        fontSize: 32,
      },
        '& .financialLabel': {
        marginTop: '24px',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#fff',
          '@media (max-width: 767px)': {
            fontSize: '18px',
          },
        },
      '& .financialText':{
          fontSize: '28px',
          fontWeight: 'normal',
        '@media (max-width: 767px)': {
          fontSize: '18px',
        },
      },
      '& .value': {
        fontSize: 26,
        fontWeight: 300,
      },
    }
  }
};

BannerCountry.propTypes = {
  intl: intlShape.isRequired
};

export default injectSheet(styles)(injectIntl(BannerCountry));