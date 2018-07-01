import React from 'react';

import Spin from 'antd/es/spin';
import { connect } from 'react-redux';

import BaseFilter from '../../components/filters/BaseFilter';
import * as actions from "../../services/actions";
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';

class Services extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'sector', actions.servicesRequest);
      } else {
        dispatch(actions.servicesInitial());
      }
    }
  }

  render() {
    const { services } = this.props;
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.projects' text='Projects' />},
    ];
    return (
      <Spin spinning={services.request}>
        <Page breadcrumbItems={breadcrumbItems}>
        </Page>
      </Spin>
    );
  }
}

Services.defaultProps = {
  groupBy: 'sector',
  filterRequest: actions.servicesRequest,
};

const mapStateToProps = (state, ) => {
  return {
    services: state.services
  }
};

export default connect(mapStateToProps)(Services);