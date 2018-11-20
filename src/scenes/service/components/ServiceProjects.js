import React  from 'react';
import { injectIntl, intlShape } from 'react-intl';
import * as actions from '../../../services/actions';
import { connect } from 'react-redux';
import get from 'lodash/get';

import BaseFilter from '../../../components/base/filters/BaseFilter';
import ProjectsTable from '../components/ProjectsTable';
import {addFilterValues} from "../../../helpers/generic";

class ServiceProjects extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,participating_organisations,activity_dates,activity_status,aggregations,sectors,title,humanitarian',
        ordering: '-activity_budget_value',
        convert_to: 'usd',
        hierarchy: 1,
        sector: get(props, 'sectorId'),
        page_size: 5,
          page: 1,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
      },
      update: false,
      filters: {values: {}, changed: false, chips: {}},
    };
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  handleSortBy(value) {
    const newParams = this.state.params;
    newParams.ordering = value;
    this.setState({params: newParams}, () => {
      this.getProjects();
    });
  }

  getProjects() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
          if(this.props.filterValues)
          {
              //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
              // params works as a reference when passed in this function
              addFilterValues(this.props.filterValues, params);
          }
        dispatch(actions.serviceProjectsRequest(params));
      } else {
        dispatch(actions.serviceProjectsInitial());
      }
    }
  }

  componentDidMount() {
    this.getProjects();
  }

  render() {
    return (
      <ProjectsTable
        data={get(this.props.serviceProjects, 'data')}
        fieldName="page"
        rootComponent={this}
        selectedSortBy={this.state.params.ordering}
        handleSortBy={e => this.handleSortBy(e)}
      />
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