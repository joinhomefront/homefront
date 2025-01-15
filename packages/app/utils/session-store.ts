import { SecureStorage } from "./secure-storage";

const secureStorage = new SecureStorage();
const key = "authjs.session-token";

export const getToken = async (): Promise<string | null> => {
  try {
    return await secureStorage.getItem(key);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const setToken = async (value: string): Promise<void> => {
  try {
    await secureStorage.setItem(key, value);
    console.log("Token stored securely.");
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const deleteToken = async (): Promise<void> => {
  try {
    await secureStorage.removeItem(key);
    console.log("Token removed successfully.");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
