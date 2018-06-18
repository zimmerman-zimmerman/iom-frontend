import React, { Component } from 'react';
import Spin from 'antd/es/spin';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import MediaQuery from 'react-responsive';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';
import List from 'antd/es/list';
import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';

import { pieRadialChart as pieRadialChartStyle, variables as variablesStyle } from '../../../helpers/style';
import {size as screenSize} from '../../../helpers/screen';
import ResponsivePieRadialChart from '../../../containers/ResponsivePieRadialChart';

class HomeChart extends Component {
  resize = () => this.forceUpdate();

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    const { dispatch, params, request, initial } = this.props;
    if (dispatch) {
      if (params) {
        dispatch(request(params));
      } else {
        dispatch(initial());
      }
    }
  }

  render() {
    const { reducer, localeTitle, intl, nameField, valueField, localeButtonText } = this.props;
    const data = [];
    forEach(get(reducer, 'data.results'), function(item){
      data.push({
        name: get(item, nameField),
        value: get(item, valueField),
      });
    });
    const prefixLegend = intl.formatMessage({id: 'currency.usd', defaultMessage: 'USD'});
    const title = intl.formatMessage(localeTitle);
    const Title = (props) => {
      const { classes } = props;
      return (
        <Row middle="xs" start="xs" center="xs" className={classes.title}>
          <Col xs={12}>
            {title} {title}
          </Col>
        </Row>
      )
    };
    const StyledTitle = injectSheet(styles)(Title);
    const PieRadialChart = (props) => {
      const {widthDivider } = props;
      const height = window.innerWidth / widthDivider;
      return (
        <ResponsivePieRadialChart height={height - 10} data={data} prefixLegend={prefixLegend}
                                  innerRadius={height / 3.7}
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
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Badge dot={true} style={{ backgroundColor: pieRadialChartStyle.colors[index]}} />}
                    title={item.name}
                  />
                </List.Item>
              )}
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
            <Link to={`/donors`}>
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
              <PieRadialChart widthDivider={1.5}/>
            </MediaQuery>
            <MediaQuery minWidth={screenSize.desktop.minWidth}>
              <PieRadialChart widthDivider={3.5}/>
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
    fontSize: 18,
  },
  listItems: {
    height: 350,
    padding: '0 40px 30px 40px',
    '& .ant-badge-dot': {
      height: 8,
      width: 8,
    },
    '& .ant-list-item-meta-avatar': {
      marginTop: 7,
      marginLeft: 5,
    },
    '& .ant-list-item-meta': {
      minHeight: 40,
      maxHeight: 40,
    },
    '& .ant-list-item-meta-title': {
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      maxHeight: 45,
      maxWidth: '100%',
    }
  },
  linkButton: {
    padding: '0 40px 30px 40px',
    '& .ant-btn': {
      width: '100%',
      color: 'white',
      textTransform: 'uppercase',
      backgroundColor: variablesStyle.blue,
      border: 'none',
    }
  }
};

HomeChart.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(HomeChart);