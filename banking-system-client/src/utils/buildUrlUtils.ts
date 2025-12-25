export const buildUrl = (
  endpoint: string,
  params: Record<string, string | number>,
) => {
  return Object.keys(params).reduce(
    (url, key) => url.replace(`:${key}`, String(params[key])),
    endpoint,
  );
};
