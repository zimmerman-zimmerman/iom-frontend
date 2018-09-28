import includes from 'lodash/includes';

// Check a protocol to the external URL if not included on it will be added to it.
// Example: if url like  this: 'www.test.com' will be became '//www.test.com'
export function checkProtocol(url) {
  if (!includes(url, 'http')) {
    url = '//' + url;
  }
  return url;
}