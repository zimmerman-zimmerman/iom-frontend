import HomeChart from './HomeChart'

class HomeDonors extends HomeChart {}

HomeDonors.defaultProps = {
  localeTitle: {id: 'home.donors.title', defaultMessage: 'Where the Funding Come From'},
};

export default HomeDonors;