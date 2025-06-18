export const buildUrl = (endpoint: string, params: Record<string, string>) => {
  return Object.keys(params).reduce(
    (url, key) => url.replace(`:${key}`, params[key]),
    endpoint,
  );
};
