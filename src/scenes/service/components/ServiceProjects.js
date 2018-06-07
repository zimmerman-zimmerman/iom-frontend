import React  from 'react';
import Layout from 'antd/es/layout';
import Spin from 'antd/es/spin';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as actions from '../../../services/actions';
import { connect } from 'react-redux';
import get from 'lodash/get';

import BaseFilter from '../../../components/filters/BaseFilter';
import ProjectsTable from '../components/ProjectsTable';

const { Content } = Layout;

class ServiceProjects extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,reporting_organisation,activity_dates,aggregations,sectors,title,humanitarian',
        ordering: '-aggregations.activity.budget_value',
        convert_to: 'usd',
        hierarchy: 1,
        activity_status: '2,3,4',
        sector: get(props, 'sectorId'),
        page_size: 5,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
      },
      update: false,
      filters: {values: {}, changed: false},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.serviceProjectsRequest(params));
      } else {
        dispatch(actions.serviceProjectsInitial());
      }
    }
  }

  render() {
    const { serviceProjects } = this.props;
    return(
      <Spin spinning={serviceProjects.request}>
        <Content className="Content">
          <h3 className="Title">
            <FormattedMessage id="service.projects.title" defaultMessage="Where the funds go"/>
          </h3>
          <ProjectsTable data={get(this.props.serviceProjects, 'data')} fieldName="page" rootComponent={this}/>
        </Content>
      </Spin>
    )
  }
}

ServiceProjects.defaultProps = {
  groupBy: null,
  filterRequest: actions.serviceProjectsRequest,
};

ServiceProjects.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {
    serviceProjects: state.serviceProjects,
  }
};

export default connect(mapStateToProps)(injectIntl(ServiceProjects));