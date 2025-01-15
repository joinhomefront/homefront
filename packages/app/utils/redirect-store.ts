import { SecureStorage } from "./secure-storage";

const secureStorage = new SecureStorage();
const key = "redirect-store.redirect-url";

export const getRedirectUrl = async (): Promise<string | null> => {
  try {
    return await secureStorage.getItem(key);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const setRedirectUrl = async (value: string): Promise<void> => {
  try {
    await secureStorage.setItem(key, value);
    console.log("Redirect URL stored securely.");
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const deleteRedirectUrl = async (): Promise<void> => {
  try {
    await secureStorage.removeItem(key);
    console.log("Redirect URL removed successfully.");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
