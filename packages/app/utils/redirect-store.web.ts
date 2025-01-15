import { deleteCookie, getCookie, setCookie } from "./secure-cookie.web";

const key = "redirect-store.redirect-url";

export const getRedirectUrl = (): Promise<string | undefined> => {
  try {
    return Promise.resolve(getCookie(key));
  } catch (error) {
    console.error("Error getting token from cookies:", error);
    return Promise.resolve(undefined);
  }
};

export const setRedirectUrl = async (value: string): Promise<void> => {
  try {
    await Promise.resolve(setCookie(key, value));
    console.log("Redirect URL stored in cookie.");
  } catch (error) {
    console.error("Error setting token in cookies:", error);
  }
};

export const deleteRedirectUrl = async (): Promise<void> => {
  try {
    await Promise.resolve(deleteCookie(key));
    console.log("Redirect URL removed from cookies.");
  } catch (error) {
    console.error("Error deleting token from cookies:", error);
  }
};
