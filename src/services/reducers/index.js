import update from 'immutability-helper';
import {
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
  activities,
  transactionsAggregations,
  transactionsAggregationsRegions,
  transactionsAggregationsCountries,
  transactionsAggregationsActivityStatus,
  transactionsAggregationsSector,
  transactionsAggregationsParticipatingOrganisation
};

export default reducers;