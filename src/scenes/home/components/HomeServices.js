import HomeChart from './HomeChart';

class HomeServices extends HomeChart {}

HomeServices.defaultProps = {
  localeTitle: {id: 'home.services.title', defaultMessage: 'Where the Funding Goes'},
  localeButtonText: {id: 'home.services.button', defaultMessage: 'See All Publisher Services'},
  linkPage: '/services',
};

export default HomeServices;