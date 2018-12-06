import HomeChart from './HomeChart';

class HomeActivities extends HomeChart {}

HomeActivities.defaultProps = {
  localeTitle: {id: 'home.activities.title', defaultMessage: 'How the money is classified'},
  localeButtonText: {id: 'home.activities.button', defaultMessage: 'See All Published Projects'},
  linkPage: '/projects',
};

export default HomeActivities;