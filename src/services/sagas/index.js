import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as genericActions from '../actions/generic';
import * as api from '../index';

export function* homeDonorsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.homeDonorsSuccess(response));
  } catch (error) {
    yield put(actions.homeDonorsFailed(error));
  }
}

export function* homeActivitiesRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(actions.homeActivitiesSuccess(response));
  } catch (error) {
    yield put(actions.homeActivitiesFailed(error));
  }
}

export function* homeSectorsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.homeSectorsSuccess(response));
  } catch (error) {
    yield put(actions.homeSectorsFailed(error));
  }
}

export function* donorsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.donorsSuccess(response));
  } catch (error) {
    yield put(actions.donorsFailed(error));
  }
}

export function* donorRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.donorSuccess(response));
  } catch (error) {
    yield put(actions.donorFailed(error));
  }
}

export function* donorProjectsRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(actions.donorProjectsSuccess(response));
  } catch (error) {
    yield put(actions.donorProjectsFailed(error));
  }
}

export function* countriesRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.countriesSuccess(response));
  } catch (error) {
    yield put(actions.countriesFailed(error));
  }
}

export function* countryRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.countrySuccess(response));
  } catch (error) {
    yield put(actions.countryFailed(error));
  }
}

export function* countryDonorsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.countryDonorsSuccess(response));
  } catch (error) {
    yield put(actions.countryDonorsFailed(error));
  }
}

export function* countrySectorsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.countrySectorsSuccess(response));
  } catch (error) {
    yield put(actions.countrySectorsFailed(error));
  }
}

export function* countryActivitiesRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(actions.countryActivitiesSuccess(response));
  } catch (error) {
    yield put(actions.countryActivitiesFailed(error));
  }
}

export function* servicesRequest(action) {
  try {
    const response = yield call(api.budgetsAggregationsRequest, action.values);
    yield put(actions.servicesSuccess(response));
  } catch (error) {
    yield put(actions.servicesFailed(error));
  }
}

export function* serviceRequest(action) {
  try {
    const response = yield call(api.budgetsAggregationsRequest, action.values);
    yield put(actions.serviceSuccess(response));
  } catch (error) {
    yield put(actions.serviceFailed(error));
  }
}

export function* serviceDonorsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.serviceDonorsSuccess(response));
  } catch (error) {
    yield put(actions.serviceDonorsFailed(error));
  }
}

export function* serviceCountriesRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.serviceCountriesSuccess(response));
  } catch (error) {
    yield put(actions.serviceCountriesFailed(error));
  }
}

export function* serviceProjectsRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(actions.serviceProjectsSuccess(response));
  } catch (error) {
    yield put(actions.serviceProjectsFailed(error));
  }
}

export function* projectsRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(actions.projectsSuccess(response));
  } catch (error) {
    yield put(actions.projectsFailed(error));
  }
}

export function* projectRequest(action) {
  try {
    const response = yield call(api.activityRequest, action.id);
    yield put(actions.projectSuccess(response));
  } catch (error) {
    yield put(actions.projectFailed(error));
  }
}

export function* projectTransactionsRequest(action) {
  try {
    const response = yield call(api.activityTransactionsRequest, action.code);
    yield put(actions.projectTransactionsSuccess(response));
  } catch (error) {
    yield put(actions.projectTransactionsFailed(error));
  }
}

export function* projectLocationRequest(action) {
  try {
    const response = yield call(api.countryRequest, action.code);
    yield put(actions.projectLocationSuccess(response));
  } catch (error) {
    yield put(actions.projectLocationFailed(error));
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

export function* transactionsAggregationsRegionsRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.transactionsAggregationsRegionsSuccess(response));
  } catch (error) {
    yield put(actions.transactionsAggregationsRegionsFailed(error));
  }
}

export function* transactionsAggregationsCountriesRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.transactionsAggregationsCountriesSuccess(response));
  } catch (error) {
    yield put(actions.transactionsAggregationsCountriesFailed(error));
  }
}

export function* transactionsAggregationsActivityStatusRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.transactionsAggregationsActivityStatusSuccess(response));
  } catch (error) {
    yield put(actions.transactionsAggregationsActivityStatusFailed(error));
  }
}

export function* transactionsAggregationsSectorRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.transactionsAggregationsSectorSuccess(response));
  } catch (error) {
    yield put(actions.transactionsAggregationsSectorFailed(error));
  }
}

export function* transactionsAggregationsParticipatingOrganisationRequest(action) {
  try {
    const response = yield call(api.transactionsAggregationsRequest, action.values);
    yield put(actions.transactionsAggregationsParticipatingOrganisationSuccess(response));
  } catch (error) {
    yield put(actions.transactionsAggregationsParticipatingOrganisationFailed(error));
  }
}

export function* toggleModalRequest(action, open) {
    yield put(genericActions.toggleModalSuccess(action, open));
}

export function* updateBreadcrumbsRequest(action) {
    yield put(genericActions.updateBreadcrumbsSuccess(action));
}

export function* nonHumanServicesRequest(action) {
    try {
        const response = yield call(api.budgetsAggregationsRequest, action.values);
        yield put(actions.nonHumanServicesSuccess(response));
    } catch (error) {
        yield put(actions.nonHumanServicesFailed(error));
    }
}

export function* localeRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.localeSuccess(response));
  } catch (error) {
    yield put(actions.localeFailed(error));
  }
}

export function* organisationDocumentLinksRequest(action) {
  try {
    const response = yield call(api.organisationDocumentLinksRequest, action.values);
    yield put(actions.organisationDocumentLinksSuccess(response));
  } catch (error) {
    yield put(actions.organisationDocumentLinksFailed(error));
  }
}

export function* homeMediaContentRequest(action) {
  try {
    const response = yield call(api.mediaContentRequest, action.slug);
    yield put(actions.homeMediaContentSuccess(response));
  } catch (error) {
    yield put(actions.homeMediaContentFailed(error));
  }
}

export function * countryMappingJsonRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.countryMappingJsonSuccess(response));
  } catch (error) {
    yield put(actions.countryMappingJsonFailed(error));
  }
}

export function* donorsGroupsJsonRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.donorsGroupsJsonSuccess(response));
  } catch (error) {
    yield put(actions.donorsGroupsJsonFailed(error));
  }
}

export function* donorGroupJsonRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.donorGroupJsonSuccess(response));
  } catch (error) {
    yield put(actions.donorGroupJsonFailed(error));
  }
}

export function* homeFundingGoesRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.homeFundingGoesSuccess(response));
  } catch (error) {
    yield put(actions.homeFundingGoesFailed(error));
  }
}

export function* aboutMediaContentRequest(action) {
    try {
        const response = yield call(api.mediaContentRequest, action.slug);
        yield put(actions.aboutMediaContentSuccess(response));
    } catch (error) {
        yield put(actions.aboutMediaContentFailed(error));
    }
}

export function* countryM49MappingRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.countryM49MappingSuccess(response));
  } catch (error) {
    yield put(actions.countryM49MappingFailed(error));
  }
}

export function* m49RegionRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.m49RegionSuccess(response));
  } catch (error) {
    yield put(actions.m49RegionFailed(error));
  }
}

export function* sectorMappingRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.sectorMappingSuccess(response));
  } catch (error) {
    yield put(actions.sectorMappingFailed(error));
  }
}

export function* donutDataJsonRequest(action) {
    try {
        const response = yield call(api.JSONContentRequest, action.slug);
        yield put(actions.donutDataJsonSuccess(response));
    } catch (error) {
        yield put(actions.donutDataJsonFailed(error));
    }
}

export function* sectorsDescJsonRequest(action) {
    try {
        const response = yield call(api.JSONContentRequest, action.slug);
        yield put(actions.sectorsDescJsonSuccess(response));
    } catch (error) {
        yield put(actions.sectorsDescJsonFailed(error));
    }
}

export function* countriesDescJsonRequest(action) {
    try {
        const response = yield call(api.JSONContentRequest, action.slug);
        yield put(actions.countriesDescJsonSuccess(response));
    } catch (error) {
        yield put(actions.countriesDescJsonFailed(error));
    }
}

export function* cebCategoriesJsonRequest(action) {
  try {
    const response = yield call(api.JSONContentRequest, action.slug);
    yield put(actions.cebCategoriesJsonSuccess(response));
  } catch (error) {
    yield put(actions.cebCategoriesJsonFailed(error));
  }
}

function* sagas() {
  yield [
    takeLatest('COUNTRIES_DESC_JSON_REQUEST', countriesDescJsonRequest),
    takeLatest('SECTORS_DESC_JSON_REQUEST', sectorsDescJsonRequest),
    takeLatest('DONUT_DATA_JSON_REQUEST', donutDataJsonRequest),
    takeLatest('ABOUT_MEDIA_CONTENT_REQUEST', aboutMediaContentRequest),
    takeLatest('PROJECT_TRANSACTIONS_REQUEST', projectTransactionsRequest),
    takeLatest('NON_HUMAN_SERVICES_REQUEST', nonHumanServicesRequest),
    takeLatest('TOGGLE_MODAL_REQUEST', toggleModalRequest),
    takeLatest('UPDATE_BREADCRUMBS_REQUEST', updateBreadcrumbsRequest),
    takeLatest('HOME_DONORS_REQUEST', homeDonorsRequest),
    takeLatest('HOME_ACTIVITIES_REQUEST', homeActivitiesRequest),
    takeLatest('HOME_SECTORS_REQUEST', homeSectorsRequest),
    takeLatest('DONORS_REQUEST', donorsRequest),
    takeLatest('DONOR_REQUEST', donorRequest),
    takeLatest('DONOR_PROJECTS_REQUEST', donorProjectsRequest),
    takeLatest('COUNTRIES_REQUEST', countriesRequest),
    takeLatest('COUNTRY_REQUEST', countryRequest),
    takeLatest('COUNTRY_DONORS_REQUEST', countryDonorsRequest),
    takeLatest('COUNTRY_SECTORS_REQUEST', countrySectorsRequest),
    takeLatest('COUNTRY_ACTIVITIES_REQUEST', countryActivitiesRequest),
    takeLatest('SERVICES_REQUEST', servicesRequest),
    takeLatest('SERVICE_REQUEST', serviceRequest),
    takeLatest('SERVICE_DONORS_REQUEST', serviceDonorsRequest),
    takeLatest('SERVICE_PROJECTS_REQUEST', serviceProjectsRequest),
    takeLatest('SERVICE_COUNTRIES_REQUEST', serviceCountriesRequest),
    takeLatest('PROJECTS_REQUEST', projectsRequest),
    takeLatest('PROJECT_REQUEST', projectRequest),
    takeLatest('PROJECT_LOCATION_REQUEST', projectLocationRequest),
    takeLatest('TRANSACTIONS_AGGREGATIONS_REQUEST', transactionsAggregationsRequest),
    takeLatest('TRANSACTIONS_AGGREGATIONS_REGIONS_REQUEST', transactionsAggregationsRegionsRequest),
    takeLatest('TRANSACTIONS_AGGREGATIONS_COUNTRIES_REQUEST', transactionsAggregationsCountriesRequest),
    takeLatest('TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_REQUEST', transactionsAggregationsActivityStatusRequest),
    takeLatest('TRANSACTIONS_AGGREGATIONS_SECTOR_REQUEST', transactionsAggregationsSectorRequest),
    takeLatest(
      'TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_REQUEST',
      transactionsAggregationsParticipatingOrganisationRequest
    ),
    takeLatest('LOCALE_REQUEST', localeRequest),
    takeLatest('ORGANISATION_DOCUMENT_LINKS_REQUEST', organisationDocumentLinksRequest),
    takeLatest('HOME_MEDIA_CONTENT_REQUEST', homeMediaContentRequest),
    takeLatest('DONORS_GROUPS_JSON_REQUEST', donorsGroupsJsonRequest),
    takeLatest('DONOR_GROUP_JSON_REQUEST', donorGroupJsonRequest),
    takeLatest('HOME_FUNDING_GOES_REQUEST', homeFundingGoesRequest),
    takeLatest('COUNTRY_MAPPING_JSON_REQUEST', countryMappingJsonRequest),
    takeLatest('COUNTRY_M49_MAPPING_REQUEST', countryM49MappingRequest),
    takeLatest('M49_REGION_REQUEST', m49RegionRequest),
    takeLatest('SECTOR_MAPPING_REQUEST', sectorMappingRequest),
    takeLatest('CEB_CATEGORIES_JSON_REQUEST', cebCategoriesJsonRequest),
  ]
}

export default sagas;