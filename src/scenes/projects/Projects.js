import React, { Component } from 'react';
import Layout from 'antd/es/layout';

import MainHeader from '../../components/main/MainHeader';
import BaseFilter from "../../components/filters/BaseFilter";
import * as actions from "../../services/actions";

const { Header } = Layout;

class Projects extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'recipient_country', actions.countriesRequest);
      } else {
        dispatch(actions.countriesInitial());
      }
    }
  }

  render() {
    return (
      <Layout>
        <Header className="Header">
          <MainHeader/>
        </Header>
      </Layout>
    );
  }
}

export default Projects;