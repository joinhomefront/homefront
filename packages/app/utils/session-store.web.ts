import { deleteCookie, getCookie, setCookie } from "./secure-cookie.web";

const key = "authjs.session-token";

export const getToken = (): Promise<string | undefined> => {
  try {
    return Promise.resolve(getCookie(key));
  } catch (error) {
    console.error("Error getting token from cookies:", error);
    return Promise.resolve(undefined);
  }
};

export const setToken = (value: string): void => {
  try {
    setCookie(key, value);
    console.log("Token stored in cookie.");
  } catch (error) {
    console.error("Error setting token in cookies:", error);
  }
};

export const deleteToken = (): void => {
  try {
    deleteCookie(key);
    console.log("Token removed from cookies.");
  } catch (error) {
    console.error("Error deleting token from cookies:", error);
  }
};
