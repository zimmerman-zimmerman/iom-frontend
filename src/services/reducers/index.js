import update from 'immutability-helper';
import {
  HOME_DONORS_INITIAL, HOME_DONORS_REQUEST, HOME_DONORS_SUCCESS, HOME_DONORS_FAILED,
  HOME_ACTIVITIES_INITIAL, HOME_ACTIVITIES_REQUEST, HOME_ACTIVITIES_SUCCESS, HOME_ACTIVITIES_FAILED,
  HOME_SECTORS_INITIAL, HOME_SECTORS_REQUEST, HOME_SECTORS_SUCCESS, HOME_SECTORS_FAILED,
  DONORS_INITIAL, DONORS_REQUEST, DONORS_SUCCESS, DONORS_FAILED,
  DONOR_INITIAL, DONOR_REQUEST, DONOR_SUCCESS, DONOR_FAILED,
  COUNTRIES_INITIAL, COUNTRIES_REQUEST, COUNTRIES_SUCCESS, COUNTRIES_FAILED,
  COUNTRY_INITIAL, COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILED,
  COUNTRY_DONORS_INITIAL, COUNTRY_DONORS_REQUEST, COUNTRY_DONORS_SUCCESS, COUNTRY_DONORS_FAILED,
  COUNTRY_ACTIVITIES_INITIAL, COUNTRY_ACTIVITIES_REQUEST, COUNTRY_ACTIVITIES_SUCCESS, COUNTRY_ACTIVITIES_FAILED,
  PROJECTS_INITIAL, PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILED,
  ACTIVITIES_INITIAL, ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS, ACTIVITIES_FAILED,
  TRANSACTIONS_AGGREGATIONS_INITIAL, TRANSACTIONS_AGGREGATIONS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_SUCCESS, TRANSACTIONS_AGGREGATIONS_FAILED,
  TRANSACTIONS_AGGREGATIONS_REGIONS_INITIAL, TRANSACTIONS_AGGREGATIONS_REGIONS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_REGIONS_SUCCESS, TRANSACTIONS_AGGREGATIONS_REGIONS_FAILED,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_INITIAL, TRANSACTIONS_AGGREGATIONS_COUNTRIES_REQUEST,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_SUCCESS, TRANSACTIONS_AGGREGATIONS_COUNTRIES_FAILED,
  TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_INITIAL, TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_SUCCESS, TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_FAILED,
  TRANSACTIONS_AGGREGATIONS_SECTOR_INITIAL, TRANSACTIONS_AGGREGATIONS_SECTOR_REQUEST,
  TRANSACTIONS_AGGREGATIONS_SECTOR_SUCCESS, TRANSACTIONS_AGGREGATIONS_SECTOR_FAILED,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_INITIAL,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_REQUEST,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_FAILED
} from '../actions/index';

const initial = {
  values: null,
  request: false,
  success: false,
  data: null,
  error: {
    status: null,
    statusText: null,
    result: null
  },
};

function homeDonors(state=initial, action) {
  switch (action.type) {
    case HOME_DONORS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case HOME_DONORS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case HOME_DONORS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case HOME_DONORS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function homeActivities(state=initial, action) {
  switch (action.type) {
    case HOME_ACTIVITIES_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case HOME_ACTIVITIES_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case HOME_ACTIVITIES_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case HOME_ACTIVITIES_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function homeSectors(state=initial, action) {
  switch (action.type) {
    case HOME_SECTORS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case HOME_SECTORS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case HOME_SECTORS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case HOME_SECTORS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function donors(state=initial, action) {
  switch (action.type) {
    case DONORS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case DONORS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case DONORS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case DONORS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function donor(state=initial, action) {
  switch (action.type) {
    case DONOR_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case DONOR_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case DONOR_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case DONOR_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function countries(state=initial, action) {
  switch (action.type) {
    case COUNTRIES_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRIES_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRIES_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case COUNTRIES_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function country(state=initial, action) {
  switch (action.type) {
    case COUNTRY_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRY_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRY_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case COUNTRY_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function countryDonors(state=initial, action) {
  switch (action.type) {
    case COUNTRY_DONORS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRY_DONORS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRY_DONORS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case COUNTRY_DONORS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function countryActivities(state=initial, action) {
  switch (action.type) {
    case COUNTRY_ACTIVITIES_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRY_ACTIVITIES_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case COUNTRY_ACTIVITIES_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case COUNTRY_ACTIVITIES_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function projects(state=initial, action) {
  switch (action.type) {
    case PROJECTS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case PROJECTS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case PROJECTS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case PROJECTS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function activities(state=initial, action) {
  switch (action.type) {
    case ACTIVITIES_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case ACTIVITIES_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case ACTIVITIES_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case ACTIVITIES_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function transactionsAggregations(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function transactionsAggregationsRegions(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_REGIONS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_REGIONS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_REGIONS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_REGIONS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function transactionsAggregationsCountries(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function transactionsAggregationsActivityStatus(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function transactionsAggregationsSector(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_SECTOR_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_SECTOR_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_SECTOR_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_SECTOR_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

function transactionsAggregationsParticipatingOrganisation(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_INITIAL:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_REQUEST:
      return update(state, {
        values: {$set: action.values},
        request: {$set: true},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: null},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_SUCCESS:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: true},
        data: {$set: action.data},
        error: {
          status: {$set: null},
          statusText: {$set: null},
          result: {$set: {}},
        },
      });
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_FAILED:
      return update(state, {
        values: {$set: null},
        request: {$set: false},
        success: {$set: false},
        data: {$set: null},
        error: {
          status: {$set: action.error.status},
          statusText: {$set: action.error.statusText},
          result: {$set: action.error.result},
        },
      });
    default:
      return state;
  }
}

const reducers = {
  homeDonors,
  homeActivities,
  homeSectors,
  donors,
  donor,
  countries,
  country,
  countryDonors,
  countryActivities,
  projects,
  activities,
  transactionsAggregations,
  transactionsAggregationsRegions,
  transactionsAggregationsCountries,
  transactionsAggregationsActivityStatus,
  transactionsAggregationsSector,
  transactionsAggregationsParticipatingOrganisation
};

export default reducers;