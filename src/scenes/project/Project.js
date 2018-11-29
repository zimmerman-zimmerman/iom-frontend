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
    const { dispatch, donorGroupJson, donorGroupJsonSlug } = this.props;
    const id = get(this.props, 'match.params.id');
    if (dispatch && id) {
      dispatch(actions.projectRequest(id));
        if(!donorGroupJson.data) {
            dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
        }
    } else {
      dispatch(actions.projectInitial());
    }
  }

  render() {
    const { project, projectLocation, donorGroupJson } = this.props;
    const data = get(this.props.project, 'data', null);
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/countries', text: <Trans id='main.menu.projects' text='Projects' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    return(
      <Spin spinning={project.request || projectLocation.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <ProjectBanner data={data} />
          <ProjectLocation data={data} donorGroupJson={get(donorGroupJson, 'data.content', {})} />
        </Page>
      </Spin>
    )
  }
}

Project.defaultProps = {
    donorGroupJsonSlug: 'donor-group-json',
};

const mapStateToProps = (state, ) => {
  return {
    project: state.project,
    donorGroupJson: state.donorGroupJson,
    projectLocation: state.projectLocation,
  }
};

export default connect(mapStateToProps)(Project);