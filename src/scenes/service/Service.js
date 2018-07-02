import React from 'react';
import Spin from 'antd/es/spin';

import { connect } from 'react-redux';
import get from 'lodash/get';
import extend from 'lodash/extend';

import BaseFilter from '../../components/filters/BaseFilter';

import './styles/Service.scss';
import * as actions from "../../services/actions";
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';
import ServiceBanner from './components/ServiceBanner';

class Service extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const id = get(this.props, 'match.params.id');
    if (dispatch && id) {
      this.actionRequest(extend({}, params, {sector: id}), 'sector', actions.serviceRequest);
    } else {
      actions.serviceInitial();
    }
  }

  render() {
    const { service } = this.props;
    const data = get(service, 'data.results[0]');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/countries', text: <Trans id='main.menu.services' text='Our Service' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    return (
      <Spin spinning={service.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          {data ? <ServiceBanner data={get(service, 'data.results[0]')}/> : null}
        </Page>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    service: state.service,
  }
};

export default connect(mapStateToProps)(Service);