import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'antd/es/layout';
import Spin from 'antd/es/spin';
import get from 'lodash/get';

import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/main/MainFooter';
import * as actions from "../../services/actions/index";
import ProjectBreadcrumb from "./components/ProjectBreadcrumb";
import './styles/Project.scss';
import ProjectBanner from "./components/ProjectBanner";
import ProjectLocation from "./components/ProjectLocation";

const { Header, Content, Footer } = Layout;

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
    return(
      <Spin spinning={project.request}>
        <Layout className='Project'>
          <Header className='Header'>
            <MainHeader/>
          </Header>
          <Content className="Content">
            <ProjectBreadcrumb/>
          </Content>
          {project.success ?
            <Layout>
              <ProjectBanner data={data}/>
              <ProjectLocation data={data}/>
              <Footer className="MainFooter">
                <MainFooter/>
              </Footer>
            </Layout> : null}
        </Layout>
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