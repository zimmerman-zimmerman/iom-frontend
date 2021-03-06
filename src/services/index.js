import 'isomorphic-fetch';
import _ from 'lodash';
import querystring from 'querystring';

function handleResponse(response) {
  return response.json().then(result => {
    if (response.ok) {
      return result
    } else {
      const error = {
        status: response.status,
        statusText: response.statusText,
        result: result
      };
      throw error
    }
  })
}

function handleRequest(url, values=null, method='post') {
  let request = {
    method: method,
    mode: 'cors',
  };
  if (values) {
    if (method === 'post') {
      _.assign(request, {body: JSON.stringify(values)})
    } else {
      url = url.concat('?', querystring.stringify(values))
    }
  }
  return fetch(url, request).then(handleResponse)
}

function hostURL(url) {
  return process.env.REACT_APP_OIPA_HOST.concat(url)
}

function formatJSON(values) {
  values.format = 'json';
  return values;
}

export function countryRequest(code) {
  return handleRequest(hostURL(`/api/countries/${code}`), formatJSON({}), 'get');
}

export function activityTransactionsRequest(code) {
  return handleRequest(hostURL(`/api/activities/${code}/transactions`), formatJSON({}), 'get');
}

export function activityRequest(id) {
  return handleRequest(hostURL(`/api/activities/${id}`), formatJSON({}), 'get');
}

export function activitiesRequest(values) {
  return handleRequest(hostURL('/iom/activity-list/'), formatJSON(values), 'get');
}

export function transactionsAggregationsRequest(values) {
  return handleRequest(hostURL('/api/transactions/aggregations'), formatJSON(values), 'get');
}

export function budgetsAggregationsRequest(values) {
    return handleRequest(hostURL('/api/budgets/aggregations'), formatJSON(values), 'get');
}

export function localeRequest() {
  return handleRequest(
    process.env.REACT_APP_SIMPLECONTENT_HOST.concat('/content/language-content/en/ui/'),
    formatJSON({}), 'get'
  );
}

export function organisationDocumentLinksRequest(values) {
  return handleRequest(
    process.env.REACT_APP_OIPA_YODA_HOST.concat('/api/organisations/organisation-file/')
      .concat(process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER)
      .concat('/organisation-document-link-list/'),
    formatJSON(values), 'get'
  );
}

export function mediaContentRequest(slug) {
  return handleRequest(
    process.env.REACT_APP_SIMPLECONTENT_HOST.concat('/content/media/').concat(slug).concat('/'),
    formatJSON({}), 'get'
  );
}

export function JSONContentRequest(slug) {
  return handleRequest(`${process.env.REACT_APP_SIMPLECONTENT_HOST}/content/json/${slug}/`, formatJSON({}), 'get');
}