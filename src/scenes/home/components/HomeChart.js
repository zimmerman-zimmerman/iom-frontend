import React, { Component } from 'react';
import Spin from 'antd/es/spin';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import MediaQuery from 'react-responsive';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from "react-redux";
import injectSheet from 'react-jss';
import List from 'antd/es/list';
import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import * as actions from "../../../services/actions";

import { pieRadialChart as pieRadialChartStyle, variables as variablesStyle } from '../../../helpers/style';
import {size as screenSize} from '../../../helpers/screen';
import ResponsivePieRadialChart from '../../../components/base/ResponsivePieRadialChart';

class HomeChart extends Component {
  resize = () => this.forceUpdate();

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    const { dispatch, params, request, initial, donorGroupJsonSlug } = this.props;
    if (dispatch) {
      if (params) {
        dispatch(request(params));
        dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
      } else {
        dispatch(initial());
        dispatch(actions.donorGroupJsonInitial());
      }
    }
  }

  render() {
    const {
      reducer, localeTitle, intl, idField, nameField, valueField,
      localeButtonText, linkPage, donorGroupJson, dataResult
    } = this.props;
    const data = [];
    forEach(get(reducer, dataResult), function(item){
      data.push({
        id: get(item, idField),
        name: get(item, nameField),
        value: parseFloat(get(item, valueField)),
      });
    });
    const prefixLegend = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const title = intl.formatMessage(localeTitle);
    const Title = (props) => {
      const { classes } = props;
      return (
        <Row top="xs" center="xs">
          <Col xs={12} className={classes.title}>
            {title}
          </Col>
        </Row>
      )
    };
    const StyledTitle = injectSheet(styles)(Title);
    const PieRadialChart = (props) => {
      const { widthDivider } = props;
      const height = window.innerWidth / widthDivider;
      const innerRadius = height / 12;
      const outerRadius = height / 4 + 35;
      const desiredHeight = height / 5 + outerRadius + 120;
      return (
        <ResponsivePieRadialChart height={desiredHeight} data={data} prefixLegend={prefixLegend}
                                  innerRadius={innerRadius} outerRadius={outerRadius} linkPage={linkPage}
                                  donorGroupJson={donorGroupJson}
        />
      )
    };
    const ListItems = (props) => {
      const { classes } = props;
      return (
        <Row start="xs" className={classes.listItems}>
          <Col xs={12}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => {
                let donorExtra = '';
                if(linkPage === '/donors' && donorGroupJson.success) {
                  donorExtra = `${get(donorGroupJson.data.content, item.id)}/`;
                }
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Badge dot={true} style={{ backgroundColor: pieRadialChartStyle.colors[index]}} />}
                      title={item.id !== '-' ?
                        <Link to={`${linkPage}/${donorExtra}${item.id}`}>{item.name}</Link> : item.name
                      }
                    />
                  </List.Item>
                )
              }}
            />
          </Col>
        </Row>
      )
    };
    const StyledListItems = injectSheet(styles)(ListItems);
    const buttonText = intl.formatMessage(localeButtonText);
    const LinkButton = (props) => {
      const { classes } = props;
      return (
        <Row middle="xs" start="xs" className={classes.linkButton}>
          <Col xs={12}>
            <Link to={linkPage}>
              <Button>
                {buttonText}
              </Button>
            </Link>
          </Col>
        </Row>
      )
    };
    const StyledLinkButton = injectSheet(styles)(LinkButton);
    return (
      <Spin spinning={reducer.request}>
        <StyledTitle />
        <Row middle="xs" start="xs" center="xs">
          <Col xs={12}>
            <MediaQuery maxWidth={screenSize.tablet.maxWidth}>
              <PieRadialChart widthDivider={1.5} />
            </MediaQuery>
            <MediaQuery minWidth={screenSize.desktop.minWidth}>
              <PieRadialChart widthDivider={2.3} />
            </MediaQuery>
          </Col>
        </Row>
        <StyledListItems />
        <StyledLinkButton />
      </Spin>
    )
  }
}

const styles = {
  title: {
    padding: '30px 20px 0 20px',
    fontSize: '31px',
    fontWeight: 300,
      height: 122,
      '@media only screen and (max-width: 767px)': {
          height: 'unset',
          fontSize: '18px',
      },
  },
  listItems: {
    '@media only screen and (min-width: 992px)': {
      height: 350,
    },
    '@media only screen and (max-width: 767px)': {
      padding: '0 0 30px 0',
    },
    padding: '0 40px 30px 40px',
    '& .ant-badge-dot': {
      height: 14,
      width: 14,
      boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.16)',
    },
    '& .ant-list-item-meta-avatar': {
      marginTop: 7,
      marginLeft: 5,
    },
    '& .ant-list-item-meta': {
      minHeight: 56,
      maxHeight: 56,
    },
    '& .ant-list-item-meta-title': {
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      maxHeight: 54,
      maxWidth: '100%',
      fontSize: 21,
        fontWeight: 500,
      lineHeight: 1.33,
      '@media only screen and (max-width: 767px)': {
        fontSize: 15,
      }
    }
  },
  linkButton: {
    marginTop: 80,
    '@media only screen and (max-width: 767px)': {
      marginTop: 0,
      padding: '0 0 30px 0',
    },
    padding: '0 40px 95px 40px',
    '& .ant-btn': {
      width: '100%',
      color: 'white',
      textTransform: 'uppercase',
      backgroundColor: variablesStyle.blue,
      border: 'none',
      height: 51,
      fontSize: 18,
    }
  }
};

HomeChart.propTypes = {
  intl: intlShape.isRequired
};

HomeChart.defaultProps = {
  donorGroupJsonSlug: 'donor-group-json',
};

const mapStateToProps = (state, ) => {
  return {
    donorGroupJson: state.donorGroupJson,
  }
};

export default injectIntl(connect(mapStateToProps)(HomeChart));
