import HomeChart from './HomeChart';
import * as actions from '../../../services/actions/index';
import { connect } from 'react-redux';

class HomeFundingGoes extends HomeChart {}

HomeFundingGoes.defaultProps = {
  params: 'funding-goes',
  request: actions.homeFundingGoesRequest,
  initial: actions.homeFundingGoesInitial,
  idField: 'participating_organisation_ref',
  nameField: 'participating_organisation',
  valueField: 'value',
  localeTitle: {id: 'home.activities.title', defaultMessage: 'Where the Funding Goes'},
  localeButtonText: {id: 'home.activities.button', defaultMessage: 'See All Publisher Services'},
  linkPage: '/projects',
  dataResult: 'data.content'
};

const mapStateToProps = (state, ) => {
  return {
    reducer: state.homeFundingGoes
  }
};

export default connect(mapStateToProps)(HomeFundingGoes);