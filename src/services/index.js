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
    method: method
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

export function activityRequest(id) {
  return handleRequest(hostURL(`/api/activities/${id}`), formatJSON({}), 'get');
}

export function activitiesRequest(values) {
  return handleRequest(hostURL('/api/activities/'), formatJSON(values), 'get');
}

export function transactionsAggregationsRequest(values) {
  return handleRequest(hostURL('/api/transactions/aggregations'), formatJSON(values), 'get');
}