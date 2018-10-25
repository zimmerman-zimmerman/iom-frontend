import HomeChart from './HomeChart';
import * as actions from '../../../services/actions/index';
import { connect } from 'react-redux';

class HomeDonors extends HomeChart {}

HomeDonors.defaultProps = {
  params: {
    aggregations: 'value',
    group_by: 'participating_organisation',
    order_by: '-value',
    page_size: 5,
    reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
  },
  request: actions.homeDonorsRequest,
  initial: actions.homeDonorsInitial,
  idField: 'participating_organisation_ref',
  nameField: 'participating_organisation',
  valueField: 'value',
  localeTitle: {id: 'home.donors.title', defaultMessage: 'Where the Funding Comes From'},
  localeButtonText: {id: 'home.donors.button', defaultMessage: 'See All Publisher Donors'},
  linkPage: '/donors',
  dataResult: 'data.results',
};

const mapStateToProps = (state, ) => {
  return {
    reducer: state.homeDonors
  }
};

export default connect(mapStateToProps)(HomeDonors);