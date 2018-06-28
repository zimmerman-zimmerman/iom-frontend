import React, { Component } from 'react';
import {connect} from "react-redux";
import Spin from 'antd/es/spin';
import get from 'lodash/get';
import { Grid, Row, Col } from 'react-flexbox-grid';

import * as actions from "../../services/actions/index";
import './styles/Project.scss';
import ProjectBanner from "./components/ProjectBanner";
import ProjectLocation from "./components/ProjectLocation";
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';

class Project extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const id = get(this.props, 'match.params.id');
    if (dispatch && id) {
      dispatch(actions.projectRequest(id));
    } else {
      dispatch(actions.projectInitial());
    }
  }

  render() {
    const { project } = this.props;
    const data = get(this.props.project, 'data', null);
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/countries', text: <Trans id='main.menu.projects' text='Projects' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    return(
      <Spin spinning={project.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <ProjectBanner data={data} />
          <ProjectLocation data={data} />
        </Page>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    project: state.project,
  }
};

export default connect(mapStateToProps)(Project);