import HomeChart from './HomeChart';
import * as actions from '../../../services/actions/index';
import { connect } from 'react-redux';

class HomeDonors  extends HomeChart {}

HomeDonors.defaultProps = {
  localeTitle: {id: 'home.donors.title', defaultMessage: 'Where the Funding Come From'},
  params: {
    aggregations: 'value',
    group_by: 'participating_organisation',
    order_by: '-value',
    convert_to: 'usd',
    page_size: 5,
    reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
  },
  request: actions.homeDonorsRequest,
  initial: actions.homeDonorsInitial,
  valueField: 'participating_organisation',
};

const mapStateToProps = (state, ) => {
  return {
    reducer: state.homeDonors
  }
};

export default connect(mapStateToProps)(HomeDonors);