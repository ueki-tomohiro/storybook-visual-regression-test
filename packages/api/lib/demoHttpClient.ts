import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import promiseRetry from "promise-retry";

import { getAccessToken, refreshAccessToken } from "./accessToken";
import { appName, appVersion } from "./appName";
import { ApiAxiosError } from "./error";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEMO_API_URL,
});

export const demoHttpClient = <T>(
  config: AxiosRequestConfig & { signal?: AbortSignal },
  options?: AxiosRequestConfig
): Promise<T> => {
  const token = getAccessToken();

  const source = Axios.CancelToken.source();
  const promise = promiseRetry((retry) =>
    axiosInstance({
      ...config,
      ...options,
      timeout: config.timeout ?? 60000,
      headers: {
        ...options?.headers,
        "X-APP-VERSION": appVersion,
        "X-APP-NAME": appName,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },

      cancelToken: source.token,
    })
      .then(({ data }) => data)
      .catch(async (error: AxiosError) => {
        if (error.code === "ECONNABORTED") {
          throw new ApiAxiosError(error);
        }
        if (error.response?.status === 401) {
          await refreshAccessToken();
          retry(error);
        }
        throw error;
      })
  );

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
