import { SecureStorage } from "./secure-storage";

const secureStorage = new SecureStorage();
const key = "auth.recovery-phrase";

export const getRecoveryPhrase = async (): Promise<string | null> => {
  try {
    return await secureStorage.getItem(key);
  } catch (error) {
    console.error("Error getting recovery phrase:", error);
    return null;
  }
};

export const setRecoveryPhrase = async (recoveryPhrase: string): Promise<void> => {
  try {
    await secureStorage.setItem(key, recoveryPhrase);
    console.log("Recovery phrase stored securely.");
  } catch (error) {
    console.error("Error setting recovery phrase:", error);
  }
};

export const deleteRecoveryPhrase = async (): Promise<void> => {
  try {
    await secureStorage.removeItem(key);
    console.log("Recovery phrase removed successfully.");
  } catch (error) {
    console.error("Error deleting recovery phrase:", error);
  }
};
