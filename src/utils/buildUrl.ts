/**
 * buildUrl()
 * Creates a fetchable URL
 * @param {string} apiUrl - The URL address of the Okuna API server
 * @param {string[]} paths - An array containing additional paths for the endpoint
 * @param {object} params - Key-value properties to append to the URL (mainly used for GET requests)
 * @returns {string} - The final URL to fetch
 */
const buildUrl = (apiUrl: string, paths: string[], params: object): string => {
  if (apiUrl.slice(-1) === '/') {
    apiUrl = apiUrl.slice(0, -1);
  }

  const _paths: string = paths.join('/');
  const _params: string = Object.keys(params)
    .map((key: string) => `${key}=${(params as any)[key]}`)
    .join('&');
  return _params
    ? `${apiUrl}${_paths}/?${_params}`
    : `${apiUrl}${_paths}/`;
};

export default buildUrl;
