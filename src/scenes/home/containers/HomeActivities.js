import HomeChart from './HomeChart';
import * as actions from '../../../services/actions/index';
import { connect } from 'react-redux';

class HomeActivities extends HomeChart {}

HomeActivities.defaultProps = {
  localeTitle: {id: 'home.donors.title', defaultMessage: 'Where the Funding Come From'},
  params: {
    fields: 'id,iati_identifier,reporting_organisation,activity_dates,aggregations,sectors,title',
    ordering: '-aggregations.activity.budget_value',
    hierarchy: 1,
    page_size: 5,
    reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
  },
  request: actions.homeActivitiesRequest,
  initial: actions.homeActivitiesInitial,
  nameField: 'title.narratives[0].text',
  valueField: 'aggregations.activity.budget_value',
  localeButtonText: {id: 'home.funding.goes.button', defaultMessage: 'See All Publisher Donors'}
};

const mapStateToProps = (state, ) => {
  return {
    reducer: state.homeActivities
  }
};

export default connect(mapStateToProps)(HomeActivities);