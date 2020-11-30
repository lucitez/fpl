import { mapKeys, camelCase } from 'lodash';

const serializeResponseError = (response: Response) => {
  const { status, body } = response;

  return {
    status,
    body,
  };
};

const makeHttpRequest = async (
  url: string,
  options?: RequestInit,
): Promise<any> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw serializeResponseError(response);
  }
  const data = await response.json();
  const camelCaseData = mapKeys(data, (_, key) => camelCase(key));
  return camelCaseData;
};

export { makeHttpRequest };
