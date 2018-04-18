export const TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_INITIAL =
  'TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_INITIAL';
export const TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_REQUEST =
  'TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_REQUEST';
export const TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_SUCCESS =
  'TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_SUCCESS';
export const TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_FAILED =
  'TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_FAILED';
export function transactionAggregationByParticipatingOrganisationInitial() {
  return {
    type: TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_INITIAL
  }
}
export function transactionAggregationByParticipatingOrganisationRequest(values) {
  return {
    type: TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_REQUEST,
    values: values
  }
}
export function transactionAggregationByParticipatingOrganisationSuccess(data) {
  return {
    type: TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_SUCCESS,
    data: data
  }
}
export function transactionAggregationByParticipatingOrganisationFailed(error) {
  return {
    type: TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_FAILED,
    error: error
  }
}

export const ACTIVITIES_INITIAL = 'ACTIVITIES_INITIAL';
export const ACTIVITIES_REQUEST = 'ACTIVITIES_REQUEST';
export const ACTIVITIES_SUCCESS = 'ACTIVITIES_SUCCESS';
export const ACTIVITIES_FAILED = 'ACTIVITIES_FAILED';
export function activitiesInitial() {
  return {
    type: ACTIVITIES_INITIAL
  }
}
export function activitiesRequest(values) {
  return {
    type: ACTIVITIES_REQUEST,
    values: values
  }
}
export function activitiesSuccess(data) {
  return {
    type: ACTIVITIES_SUCCESS,
    data: data
  }
}
export function activitiesFailed(error) {
  return {
    type: ACTIVITIES_FAILED,
    error: error
  }
}

export const TRANSACTIONS_AGGREGATIONS_INITIAL = 'TRANSACTIONS_AGGREGATIONS_INITIAL';
export const TRANSACTIONS_AGGREGATIONS_REQUEST = 'TRANSACTIONS_AGGREGATIONS_REQUEST';
export const TRANSACTIONS_AGGREGATIONS_SUCCESS = 'TRANSACTIONS_AGGREGATIONS_SUCCESS';
export const TRANSACTIONS_AGGREGATIONS_FAILED = 'TRANSACTIONS_AGGREGATIONS_FAILED';
export function transactionsAggregationsInitial() {
  return {
    type: TRANSACTIONS_AGGREGATIONS_INITIAL
  }
}
export function transactionsAggregationsRequest(values) {
  return {
    type: TRANSACTIONS_AGGREGATIONS_REQUEST,
    values: values
  }
}
export function transactionsAggregationsSuccess(data) {
  return {
    type: TRANSACTIONS_AGGREGATIONS_SUCCESS,
    data: data
  }
}
export function transactionsAggregationsFailed(error) {
  return {
    type: TRANSACTIONS_AGGREGATIONS_FAILED,
    error: error
  }
}