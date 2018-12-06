import HomeChart from './HomeChart';

class HomeDonors extends HomeChart {}

HomeDonors.defaultProps = {
  localeTitle: {id: 'home.donors.title', defaultMessage: 'Where the Funding Comes From'},
  localeButtonText: {id: 'home.donors.button', defaultMessage: 'See All Publisher Donors'},
  linkPage: '/donors',
};

export default HomeDonors;