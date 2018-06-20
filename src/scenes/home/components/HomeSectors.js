import HomeChart from './HomeChart';
import * as actions from '../../../services/actions/index';
import { connect } from 'react-redux';

class HomeSectors extends HomeChart {}

HomeSectors.defaultProps = {
  params: {
    aggregations: 'activity_count,incoming_fund,disbursement,value',
    group_by: 'sector',
    order_by: '-value',
    convert_to: 'usd',
    hierarchy: 1,
    page_size: 5,
    reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
  },
  request: actions.homeSectorsRequest,
  initial: actions.homeSectorsInitial,
  nameField: 'sector.name',
  valueField: 'value',
  localeTitle: {id: 'home.sectors.title', defaultMessage: 'How the expenditures are classified'},
  localeButtonText: {id: 'home.sectors.button', defaultMessage: 'See All Publisher Services'},
  linkPage: '/services',
};

const mapStateToProps = (state, ) => {
  return {
    reducer: state.homeSectors
  }
};

export default connect(mapStateToProps)(HomeSectors);