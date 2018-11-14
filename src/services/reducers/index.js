import update from 'immutability-helper';
import {
  HOME_DONORS_INITIAL,
  HOME_DONORS_REQUEST,
  HOME_DONORS_SUCCESS,
  HOME_DONORS_FAILED,
  HOME_ACTIVITIES_INITIAL,
  HOME_ACTIVITIES_REQUEST,
  HOME_ACTIVITIES_SUCCESS,
  HOME_ACTIVITIES_FAILED,
  HOME_SECTORS_INITIAL,
  HOME_SECTORS_REQUEST,
  HOME_SECTORS_SUCCESS,
  HOME_SECTORS_FAILED,
  DONORS_INITIAL,
  DONORS_REQUEST,
  DONORS_SUCCESS,
  DONORS_FAILED,
  DONOR_INITIAL,
  DONOR_REQUEST,
  DONOR_SUCCESS,
  DONOR_FAILED,
  DONOR_PROJECTS_INITIAL,
  DONOR_PROJECTS_REQUEST,
  DONOR_PROJECTS_SUCCESS,
  DONOR_PROJECTS_FAILED,
  COUNTRIES_INITIAL,
  COUNTRIES_REQUEST,
  COUNTRIES_SUCCESS,
  COUNTRIES_FAILED,
  COUNTRY_INITIAL,
  COUNTRY_REQUEST,
  COUNTRY_SUCCESS,
  COUNTRY_FAILED,
  COUNTRY_DONORS_INITIAL,
  COUNTRY_DONORS_REQUEST,
  COUNTRY_DONORS_SUCCESS,
  COUNTRY_DONORS_FAILED,
  COUNTRY_ACTIVITIES_INITIAL,
  COUNTRY_ACTIVITIES_REQUEST,
  COUNTRY_ACTIVITIES_SUCCESS,
  COUNTRY_ACTIVITIES_FAILED,
  SERVICES_INITIAL,
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILED,
  SERVICE_INITIAL,
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAILED,
  SERVICE_DONORS_INITIAL,
  SERVICE_DONORS_REQUEST,
  SERVICE_DONORS_SUCCESS,
  SERVICE_DONORS_FAILED,
  SERVICE_PROJECTS_INITIAL,
  SERVICE_PROJECTS_REQUEST,
  SERVICE_PROJECTS_SUCCESS,
  SERVICE_PROJECTS_FAILED,
  SERVICE_COUNTRIES_INITIAL,
  SERVICE_COUNTRIES_REQUEST,
  SERVICE_COUNTRIES_SUCCESS,
  SERVICE_COUNTRIES_FAILED,
  PROJECTS_INITIAL,
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILED,
  PROJECT_INITIAL,
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILED,
  PROJECT_LOCATION_INITIAL,
  PROJECT_LOCATION_REQUEST,
  PROJECT_LOCATION_SUCCESS,
  PROJECT_LOCATION_FAILED,
  TRANSACTIONS_AGGREGATIONS_INITIAL,
  TRANSACTIONS_AGGREGATIONS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_FAILED,
  TRANSACTIONS_AGGREGATIONS_REGIONS_INITIAL,
  TRANSACTIONS_AGGREGATIONS_REGIONS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_REGIONS_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_REGIONS_FAILED,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_INITIAL,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_REQUEST,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_COUNTRIES_FAILED,
  TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_INITIAL,
  TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_REQUEST,
  TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_FAILED,
  TRANSACTIONS_AGGREGATIONS_SECTOR_INITIAL,
  TRANSACTIONS_AGGREGATIONS_SECTOR_REQUEST,
  TRANSACTIONS_AGGREGATIONS_SECTOR_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_SECTOR_FAILED,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_INITIAL,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_REQUEST,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_SUCCESS,
  TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_FAILED,
  COUNTRY_SECTORS_INITIAL,
  COUNTRY_SECTORS_REQUEST,
  COUNTRY_SECTORS_SUCCESS,
  COUNTRY_SECTORS_FAILED,
  PROJECT_TRANSACTIONS_INITIAL,
  PROJECT_TRANSACTIONS_REQUEST,
  PROJECT_TRANSACTIONS_SUCCESS,
  PROJECT_TRANSACTIONS_FAILED,
  LOCALE_INITIAL,
  LOCALE_REQUEST,
  LOCALE_SUCCESS,
  LOCALE_FAILED,
  ORGANISATION_DOCUMENT_LINKS_INITIAL,
  ORGANISATION_DOCUMENT_LINKS_REQUEST,
  ORGANISATION_DOCUMENT_LINKS_SUCCESS,
  ORGANISATION_DOCUMENT_LINKS_FAILED,
  HOME_MEDIA_CONTENT_INITIAL,
  HOME_MEDIA_CONTENT_REQUEST,
  HOME_MEDIA_CONTENT_SUCCESS,
  HOME_MEDIA_CONTENT_FAILED,
  DONORS_GROUPS_JSON_INITIAL,
  DONORS_GROUPS_JSON_REQUEST,
  DONORS_GROUPS_JSON_SUCCESS,
  DONORS_GROUPS_JSON_FAILED,
  DONOR_GROUP_JSON_INITIAL,
  DONOR_GROUP_JSON_REQUEST,
  DONOR_GROUP_JSON_SUCCESS,
  DONOR_GROUP_JSON_FAILED,
  HOME_FUNDING_GOES_INITIAL,
  HOME_FUNDING_GOES_REQUEST,
  HOME_FUNDING_GOES_SUCCESS,
  HOME_FUNDING_GOES_FAILED,
  COUNTRY_MAPPING_JSON_INITIAL,
  COUNTRY_MAPPING_JSON_REQUEST,
  COUNTRY_MAPPING_JSON_SUCCESS,
  COUNTRY_MAPPING_JSON_FAILED
} from '../actions/index';
import {
    ABOUT_MEDIA_CONTENT_FAILED,
    ABOUT_MEDIA_CONTENT_INITIAL, ABOUT_MEDIA_CONTENT_REQUEST, ABOUT_MEDIA_CONTENT_SUCCESS,
    NON_HUMAN_SERVICES_FAILED, NON_HUMAN_SERVICES_INITIAL, NON_HUMAN_SERVICES_REQUEST,
    NON_HUMAN_SERVICES_SUCCESS
} from "../actions";

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

function updateInitial(state, action) {
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
}

function updateRequest(state, action) {
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
}

function updateSuccess(state, action) {
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
}

function updateFailed(state, action) {
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
}

function homeDonors(state=initial, action) {
  switch (action.type) {
    case HOME_DONORS_INITIAL:
      return updateInitial(state, action);
    case HOME_DONORS_REQUEST:
      return updateRequest(state, action);
    case HOME_DONORS_SUCCESS:
      return updateSuccess(state, action);
    case HOME_DONORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function homeActivities(state=initial, action) {
  switch (action.type) {
    case HOME_ACTIVITIES_INITIAL:
      return updateInitial(state, action);
    case HOME_ACTIVITIES_REQUEST:
      return updateRequest(state, action);
    case HOME_ACTIVITIES_SUCCESS:
      return updateSuccess(state, action);
    case HOME_ACTIVITIES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function homeSectors(state=initial, action) {
  switch (action.type) {
    case HOME_SECTORS_INITIAL:
      return updateInitial(state, action);
    case HOME_SECTORS_REQUEST:
      return updateRequest(state, action);
    case HOME_SECTORS_SUCCESS:
      return updateSuccess(state, action);
    case HOME_SECTORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function donors(state=initial, action) {
  switch (action.type) {
    case DONORS_INITIAL:
      return updateInitial(state, action);
    case DONORS_REQUEST:
      return updateRequest(state, action);
    case DONORS_SUCCESS:
      return updateSuccess(state, action);
    case DONORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function donor(state=initial, action) {
  switch (action.type) {
    case DONOR_INITIAL:
      return updateInitial(state, action);
    case DONOR_REQUEST:
      return updateRequest(state, action);
    case DONOR_SUCCESS:
      return updateSuccess(state, action);
    case DONOR_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function donorProjects(state=initial, action) {
  switch (action.type) {
    case DONOR_PROJECTS_INITIAL:
      return updateInitial(state, action);
    case DONOR_PROJECTS_REQUEST:
      return updateRequest(state, action);
    case DONOR_PROJECTS_SUCCESS:
      return updateSuccess(state, action);
    case DONOR_PROJECTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function countries(state=initial, action) {
  switch (action.type) {
    case COUNTRIES_INITIAL:
      return updateInitial(state, action);
    case COUNTRIES_REQUEST:
      return updateRequest(state, action);
    case COUNTRIES_SUCCESS:
      return updateSuccess(state, action);
    case COUNTRIES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function country(state=initial, action) {
  switch (action.type) {
    case COUNTRY_INITIAL:
      return updateInitial(state, action);
    case COUNTRY_REQUEST:
      return updateRequest(state, action);
    case COUNTRY_SUCCESS:
      return updateSuccess(state, action);
    case COUNTRY_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function countryDonors(state=initial, action) {
  switch (action.type) {
    case COUNTRY_DONORS_INITIAL:
      return updateInitial(state, action);
    case COUNTRY_DONORS_REQUEST:
      return updateRequest(state, action);
    case COUNTRY_DONORS_SUCCESS:
      return updateSuccess(state, action);
    case COUNTRY_DONORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function countrySectors(state=initial, action) {
  switch (action.type) {
    case COUNTRY_SECTORS_INITIAL:
      return updateInitial(state, action);
    case COUNTRY_SECTORS_REQUEST:
      return updateRequest(state, action);
    case COUNTRY_SECTORS_SUCCESS:
      return updateSuccess(state, action);
    case COUNTRY_SECTORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function countryActivities(state=initial, action) {
  switch (action.type) {
    case COUNTRY_ACTIVITIES_INITIAL:
      return updateInitial(state, action);
    case COUNTRY_ACTIVITIES_REQUEST:
      return updateRequest(state, action);
    case COUNTRY_ACTIVITIES_SUCCESS:
      return updateSuccess(state, action);
    case COUNTRY_ACTIVITIES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function services(state=initial, action) {
  switch (action.type) {
    case SERVICES_INITIAL:
      return updateInitial(state, action);
    case SERVICES_REQUEST:
      return updateRequest(state, action);
    case SERVICES_SUCCESS:
      return updateSuccess(state, action);
    case SERVICES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function nonHumanServices(state=initial, action) {
    switch (action.type) {
        case NON_HUMAN_SERVICES_INITIAL:
            return updateInitial(state, action);
        case NON_HUMAN_SERVICES_REQUEST:
            return updateRequest(state, action);
        case NON_HUMAN_SERVICES_SUCCESS:
            return updateSuccess(state, action);
        case NON_HUMAN_SERVICES_FAILED:
            return updateFailed(state, action);
        default:
            return state;
    }
}

function service(state=initial, action) {
  switch (action.type) {
    case SERVICE_INITIAL:
      return updateInitial(state, action);
    case SERVICE_REQUEST:
      return updateRequest(state, action);
    case SERVICE_SUCCESS:
      return updateSuccess(state, action);
    case SERVICE_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function serviceDonors(state=initial, action) {
  switch (action.type) {
    case SERVICE_DONORS_INITIAL:
      return updateInitial(state, action);
    case SERVICE_DONORS_REQUEST:
      return updateRequest(state, action);
    case SERVICE_DONORS_SUCCESS:
      return updateSuccess(state, action);
    case SERVICE_DONORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function serviceProjects(state=initial, action) {
  switch (action.type) {
    case SERVICE_PROJECTS_INITIAL:
      return updateInitial(state, action);
    case SERVICE_PROJECTS_REQUEST:
      return updateRequest(state, action);
    case SERVICE_PROJECTS_SUCCESS:
      return updateSuccess(state, action);
    case SERVICE_PROJECTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function serviceCountries(state=initial, action) {
  switch (action.type) {
    case SERVICE_COUNTRIES_INITIAL:
      return updateInitial(state, action);
    case SERVICE_COUNTRIES_REQUEST:
      return updateRequest(state, action);
    case SERVICE_COUNTRIES_SUCCESS:
      return updateSuccess(state, action);
    case SERVICE_COUNTRIES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function projects(state=initial, action) {
  switch (action.type) {
    case PROJECTS_INITIAL:
      return updateInitial(state, action);
    case PROJECTS_REQUEST:
      return updateRequest(state, action);
    case PROJECTS_SUCCESS:
      return updateSuccess(state, action);
    case PROJECTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function project(state=initial, action) {
  switch (action.type) {
    case PROJECT_INITIAL:
      return updateInitial(state, action);
    case PROJECT_REQUEST:
      return updateRequest(state, action);
    case PROJECT_SUCCESS:
      return updateSuccess(state, action);
    case PROJECT_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function projectLocation(state=initial, action) {
  switch (action.type) {
    case PROJECT_LOCATION_INITIAL:
      return updateInitial(state, action);
    case PROJECT_LOCATION_REQUEST:
      return updateRequest(state, action);
    case PROJECT_LOCATION_SUCCESS:
      return updateSuccess(state, action);
    case PROJECT_LOCATION_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function transactionsAggregations(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_INITIAL:
      return updateInitial(state, action);
    case TRANSACTIONS_AGGREGATIONS_REQUEST:
      return updateRequest(state, action);
    case TRANSACTIONS_AGGREGATIONS_SUCCESS:
      return updateSuccess(state, action);
    case TRANSACTIONS_AGGREGATIONS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function transactionsAggregationsRegions(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_REGIONS_INITIAL:
      return updateInitial(state, action);
    case TRANSACTIONS_AGGREGATIONS_REGIONS_REQUEST:
      return updateRequest(state, action);
    case TRANSACTIONS_AGGREGATIONS_REGIONS_SUCCESS:
      return updateSuccess(state, action);
    case TRANSACTIONS_AGGREGATIONS_REGIONS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function transactionsAggregationsCountries(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_INITIAL:
      return updateInitial(state, action);
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_REQUEST:
      return updateRequest(state, action);
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_SUCCESS:
      return updateSuccess(state, action);
    case TRANSACTIONS_AGGREGATIONS_COUNTRIES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function transactionsAggregationsActivityStatus(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_INITIAL:
      return updateInitial(state, action);
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_REQUEST:
      return updateRequest(state, action);
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_SUCCESS:
      return updateSuccess(state, action);
    case TRANSACTIONS_AGGREGATIONS_ACTIVITY_STATUS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function transactionsAggregationsSector(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_SECTOR_INITIAL:
      return updateInitial(state, action);
    case TRANSACTIONS_AGGREGATIONS_SECTOR_REQUEST:
      return updateRequest(state, action);
    case TRANSACTIONS_AGGREGATIONS_SECTOR_SUCCESS:
      return updateSuccess(state, action);
    case TRANSACTIONS_AGGREGATIONS_SECTOR_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function transactionsAggregationsParticipatingOrganisation(state=initial, action) {
  switch (action.type) {
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_INITIAL:
      return updateInitial(state, action);
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_REQUEST:
      return updateRequest(state, action);
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_SUCCESS:
      return updateSuccess(state, action);
    case TRANSACTIONS_AGGREGATIONS_PARTICIPATING_ORGANISATION_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function projectTransactions(state=initial, action) {
  switch (action.type) {
    case PROJECT_TRANSACTIONS_INITIAL:
      return updateInitial(state, action);
    case PROJECT_TRANSACTIONS_REQUEST:
      return updateRequest(state, action);
    case PROJECT_TRANSACTIONS_SUCCESS:
      return updateSuccess(state, action);
    case PROJECT_TRANSACTIONS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function locale(state=initial, action) {
  switch (action.type) {
    case LOCALE_INITIAL:
      return updateInitial(state, action);
    case LOCALE_REQUEST:
      return updateRequest(state, action);
    case LOCALE_SUCCESS:
      return updateSuccess(state, action);
    case LOCALE_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function organisationDocumentLinks(state=initial, action) {
  switch (action.type) {
    case ORGANISATION_DOCUMENT_LINKS_INITIAL:
      return updateInitial(state, action);
    case ORGANISATION_DOCUMENT_LINKS_REQUEST:
      return updateRequest(state, action);
    case ORGANISATION_DOCUMENT_LINKS_SUCCESS:
      return updateSuccess(state, action);
    case ORGANISATION_DOCUMENT_LINKS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function homeMediaContent(state=initial, action) {
  switch (action.type) {
    case HOME_MEDIA_CONTENT_INITIAL:
      return updateInitial(state, action);
    case HOME_MEDIA_CONTENT_REQUEST:
      return updateRequest(state, action);
    case HOME_MEDIA_CONTENT_SUCCESS:
      return updateSuccess(state, action);
    case HOME_MEDIA_CONTENT_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function donorsGroupsJson(state=initial, action) {
  switch (action.type) {
    case DONORS_GROUPS_JSON_INITIAL:
      return updateInitial(state, action);
    case DONORS_GROUPS_JSON_REQUEST:
      return updateRequest(state, action);
    case DONORS_GROUPS_JSON_SUCCESS:
      return updateSuccess(state, action);
    case DONORS_GROUPS_JSON_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function donorGroupJson(state=initial, action) {
  switch (action.type) {
    case DONOR_GROUP_JSON_INITIAL:
      return updateInitial(state, action);
    case DONOR_GROUP_JSON_REQUEST:
      return updateRequest(state, action);
    case DONOR_GROUP_JSON_SUCCESS:
      return updateSuccess(state, action);
    case DONOR_GROUP_JSON_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function homeFundingGoes(state=initial, action) {
  switch (action.type) {
    case HOME_FUNDING_GOES_INITIAL:
      return updateInitial(state, action);
    case HOME_FUNDING_GOES_REQUEST:
      return updateRequest(state, action);
    case HOME_FUNDING_GOES_SUCCESS:
      return updateSuccess(state, action);
    case HOME_FUNDING_GOES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function aboutMediaContent(state=initial, action) {
    switch (action.type) {
        case ABOUT_MEDIA_CONTENT_INITIAL:
            return updateInitial(state, action);
        case ABOUT_MEDIA_CONTENT_REQUEST:
            return updateRequest(state, action);
        case ABOUT_MEDIA_CONTENT_SUCCESS:
            return updateSuccess(state, action);
        case ABOUT_MEDIA_CONTENT_FAILED:
            return updateFailed(state, action);
        default:
            return state;
    }
}

function countryMappingJson(state=initial, action) {
  switch (action.type) {
      case COUNTRY_MAPPING_JSON_INITIAL:
          return updateInitial(state, action);
      case COUNTRY_MAPPING_JSON_REQUEST:
          return updateRequest(state, action);
      case COUNTRY_MAPPING_JSON_SUCCESS:
          return updateSuccess(state, action);
      case COUNTRY_MAPPING_JSON_FAILED:
          return updateFailed(state, action);
      default:
          return state;
  }
}

const reducers = {
  aboutMediaContent,
  projectTransactions,
  nonHumanServices,
  homeDonors,
  homeActivities,
  homeSectors,
  donors,
  donor,
  donorProjects,
  countries,
  country,
  countryDonors,
  countrySectors,
  countryActivities,
  services,
  service,
  serviceDonors,
  serviceProjects,
  serviceCountries,
  projects,
  project,
  projectLocation,
  transactionsAggregations,
  transactionsAggregationsRegions,
  transactionsAggregationsCountries,
  transactionsAggregationsActivityStatus,
  transactionsAggregationsSector,
  transactionsAggregationsParticipatingOrganisation,
  locale,
  organisationDocumentLinks,
  homeMediaContent,
  donorsGroupsJson,
  donorGroupJson,
  homeFundingGoes,
  countryMappingJson,
};

export default reducers;