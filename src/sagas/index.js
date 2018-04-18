import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../services';

export function* transactionAggregationByParticipatingOrganisationRequest(action) {
  try {
    const response = yield call(api.transactionAggregationByParticipatingOrganisationRequest, action.values);
    yield put(actions.transactionAggregationByParticipatingOrganisationSuccess(response));
  } catch (error) {
    yield put(actions.transactionAggregationByParticipatingOrganisationFailed(error));
  }
}


export function* activitiesRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(actions.activitiesSuccess(response));
  } catch (error) {
    yield put(actions.activitiesFailed(error));
  }
}

export function* transactionsAggregationsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.transactionsAggregationsSuccess(response));
  } catch (error) {
    yield put(actions.transactionsAggregationsFailed(error));
  }
}

function* sagas() {
  yield [
    takeLatest(
      'TRANSACTION_AGGREGATION_BY_PARTICIPATING_ORGANISATION_REQUEST',
      transactionAggregationByParticipatingOrganisationRequest
    ),
    takeLatest('ACTIVITIES_REQUEST', activitiesRequest),
    takeLatest('TRANSACTIONS_AGGREGATIONS_REQUEST', transactionsAggregationsRequest),
  ]
}

export default sagas;