import update from 'immutability-helper';
import {
  TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_INITIAL,
  TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_REQUEST,
  TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_SUCCESS,
  TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_FAILED,
  ACTIVITIES_INITIAL, ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS, ACTIVITIES_FAILED,
  TRANSACTIONS_AGGREGATIONS_INITIAL, TRANSACTIONS_AGGREGATIONS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_SUCCESS, TRANSACTIONS_AGGREGATIONS_FAILED,
  TRANSACTIONS_AGGREGATIONS_REGIONS_INITIAL, TRANSACTIONS_AGGREGATIONS_REGIONS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_REGIONS_SUCCESS, TRANSACTIONS_AGGREGATIONS_REGIONS_FAILED,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_INITIAL, TRANSACTIONS_AGGREGATIONS_COUNTRIES_REQUEST,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_SUCCESS, TRANSACTIONS_AGGREGATIONS_COUNTRIES_FAILED
} from '../actions';

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

function transactionAggregationByParticipatingOrganisation(state=initial, action) {
  switch (action.type) {
    case TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_INITIAL:
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
    case TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_REQUEST:
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
    case TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_SUCCESS:
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
    case TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_FAILED:
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

const reducers = {
  transactionAggregationByParticipatingOrganisation,
  activities,
  transactionsAggregations,
  transactionsAggregationsRegions,
  transactionsAggregationsCountries,
};

export default reducers;