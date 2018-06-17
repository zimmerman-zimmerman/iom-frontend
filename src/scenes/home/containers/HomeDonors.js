import HomeChart from './HomeChart';
import * as actions from '../../../services/actions/index';

const HomeDonors = HomeChart;

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

};


export default HomeDonors;