import * as SecureStore from "expo-secure-store";

export const setItem = async (key: string, value: string) => {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		console.error("Error setting item:", error);
	}
};

export const getItem = async (key: string) => {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.error("Error getting item:", error);
		return null;
	}
};

export const removeItem = async (key: string) => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.error("Error removing item:", error);
	}
};
