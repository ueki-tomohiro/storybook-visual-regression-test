const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

const hasSessionStorage: () => boolean = (): boolean =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export const getAccessToken = (): string => {
  if (hasSessionStorage()) {
    return sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || "";
  }

  return "";
};

export const setAccessToken = (accessToken: string): void => {
  if (hasSessionStorage()) {
    sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  }
};

export const clearAccessToken = (): void => {
  if (hasSessionStorage()) {
    sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
};

export const refreshAccessToken = async (): Promise<string | undefined> => {
  return "*****";
};
