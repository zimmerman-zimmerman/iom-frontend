import React  from 'react';
import { injectIntl, intlShape } from 'react-intl';
import * as actions from '../../../services/actions';
import { connect } from 'react-redux';
import get from 'lodash/get';

import BaseFilter from '../../../components/base/filters/BaseFilter';
import ProjectsTable from '../components/ProjectsTable';

class ServiceProjects extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,reporting_organisation,activity_dates,aggregations,sectors,title,humanitarian',
        ordering: '-aggregations.activity.budget_value',
        convert_to: 'usd',
        hierarchy: 1,
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
    return (
      <ProjectsTable data={get(this.props.serviceProjects, 'data')} fieldName="page" rootComponent={this}/>
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