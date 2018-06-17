import React, { Component } from 'react';
import Spin from 'antd/es/spin';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import MediaQuery from 'react-responsive';
import { injectIntl, intlShape } from "react-intl";
import { Row, Col } from 'react-flexbox-grid';
import injectSheet from "react-jss";

import { pieRadialChart as pieRadialChartStyle } from '../../../helpers/style';
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
    const { reducer, localeTitle, intl, valueField } = this.props;
    const data = [];
    forEach(get(reducer, 'data.results'), function(item){
      data.push({
        name: get(item, valueField),
        value: get(item, 'value'),
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
    return (
      <Spin spinning={reducer.request}>
        <StyledTitle />
        <Row middle="xs" start="xs" center="xs">
          <Col xs={12}>
            <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
              <PieRadialChart widthDivider={1.5}/>
            </MediaQuery>
            <MediaQuery minWidth={screenSize.tablet.minWidth}>
              <PieRadialChart widthDivider={3.5}/>
            </MediaQuery>
          </Col>
        </Row>
      </Spin>
    )
  }
}

const styles = {
  title: {
    padding: '30px 20px 0 20px',
    fontSize: 18,
  }
};


HomeChart.propTypes = {
  intl: intlShape.isRequired
};


export default injectIntl(HomeChart);