import React, { Component } from 'react';
import {connect} from "react-redux";
import Spin from 'antd/es/spin';
import get from 'lodash/get';

import * as actions from "../../services/actions/index";
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
    const { project, projectLocation } = this.props;
    const data = get(this.props.project, 'data', null);
    return(
      <Spin spinning={project.request || projectLocation.request}>
        <Page pageName={<Trans id='main.menu.project.detail' text='Project Detail' />}>
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
    projectLocation: state.projectLocation
  }
};

export default connect(mapStateToProps)(Project);