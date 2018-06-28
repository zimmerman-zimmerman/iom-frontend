import React, { Fragment } from 'react';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import ReactCountryFlag from "react-country-flag";
import { Link } from 'react-router-dom';
import { format } from "d3-format";
import { Row, Col } from 'react-flexbox-grid';
import Trans from '../../../locales/Trans';
import injectSheet from 'react-jss';
import get from 'lodash/get';
import {injectIntl, intlShape} from "react-intl";

const BannerCountry = (props) => {
  const { data, classes, key, intl } = props;
  const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
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
        {line: <Trans id="country.banner.right.total.budget" defaultMessage="Total project budget"/>, className: 'gap'},
        {line: <span>{usd}{format(',')(data.value)}</span>},
        {
          line: <Trans id="country.banner.right.total.incoming" defaultMessage="Total incoming funds"/>,
          className: 'gap'
        },
        {line: <span>{usd}{format(',')(data.incoming_fund)}</span>},
        {line: <Trans id="country.banner.right.activity.count" defaultMessage="Activity count"/>, className: 'gap'},
        {line: <span>{format(',')(data.activity_count)}</span>}
      ],
      [
        {
          line: <Trans id="country.banner.right.total.disbursements" defaultMessage="Total disbursements"/>,
          className: 'gap'
        },
        {line: <span>{usd}{format(',')(data.disbursement)}</span>},
        {
          line: <Trans id="country.banner.right.total.expenditure" defaultMessage="Total expenditure"/>,
          className: 'gap'
        },
        {line: <span>{usd}{format(',')(data.expenditure)}</span>},
        {line: <Trans id="country.banner.right.data.source" defaultMessage="Data source" />, className: 'gap'},
        {line: <Trans id="country.banner.right.data.source.iati.registry" defaultMessage="IATI Registry" />}
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
          { data ?
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
                  <Trans id="country.banner.overview.description" defaultMessage="Description"/>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{marginTop: 30}}>
                  <Link to={`/countries/${data.recipient_country.code.toLowerCase()}`}>
                    https://www.iom.int/countries/{data.recipient_country.code.toLowerCase()}
                  </Link>
                </Col>
              </Row>
            </Fragment> : null
          }
        </Col>
        <Col xs={12} md={6} lg={6}  className="right">
          {data ?
            <Fragment>
              <span className="title">
                <Trans id="country.banner.right.overview" defaultMessage="Financial Overview" />
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
  bannerCountry: {
    '& .left': {
      padding: '20px 65px',
      '@media (max-width: 767px)': {
        padding: '20px 35px'
      },
      backgroundColor: '#efefef',
      '& .country': {
        fontSize: 30,
        '& .name': {
          margin: '3px 10px',
          position: 'absolute',
        }
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
      backgroundColor: '#54c8c3',
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

BannerCountry.propTypes = {
  intl: intlShape.isRequired
};

export default injectSheet(styles)(injectIntl(BannerCountry));