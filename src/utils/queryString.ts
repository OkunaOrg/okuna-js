/**
 * encodeParent() - Encodes a parent key (nested objects)
 * @param {string} input - The parent key
 * @returns {string} - The encoded parent key
 */
const encodeParent = (input: string): string => {
  return encodeURIComponent(input)
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');
};

/**
 * queryString() - Builds a querystring from an object
 * @param {object} obj - The object to convert to a querystring
 * @param {object | null} parent - The current parent key
 */
const queryString = (obj: object, parent: string | null = null): string => {
  return Object.keys(obj).map(key => {
    const value = (obj as any)[key];

    if (typeof value === 'object') {
      return queryString(
        value,
        (parent ? `${encodeParent(parent)}[${encodeURIComponent(key)}]` : key));
    }

    return parent
      ? `${parent}[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`
      : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  })
    .join('&');
};

export default queryString;
