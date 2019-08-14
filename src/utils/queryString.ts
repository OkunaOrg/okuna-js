const encodeParent = (input: string): string => {
  return encodeURIComponent(input)
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');
};

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
