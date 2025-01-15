import { deleteCookie, getCookie, setCookie } from "./secure-cookie.web";

const key = "auth.recovery-phrase";

export const getRecoveryPhrase = async (): Promise<string | null> => {
  try {
    return Promise.resolve(getCookie(key) ?? null);
  } catch (error) {
    console.error("Error getting recovery phrase from cookies:", error);
    return null;
  }
};

export const setRecoveryPhrase = async (
  recoveryPhrase: string,
): Promise<void> => {
  try {
    setCookie(key, recoveryPhrase, 1);
    console.log("Recovery phrase stored in cookies.");
    return Promise.resolve();
  } catch (error) {
    console.error("Error setting recovery phrase in cookies:", error);
  }
};

export const deleteRecoveryPhrase = async (): Promise<void> => {
  try {
    deleteCookie(key);
    console.log("Recovery phrase removed from cookies.");
    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting recovery phrase from cookies:", error);
  }
};
