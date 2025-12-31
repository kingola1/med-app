import { useAuthStore } from "@/lib/store";
import axios from "axios";

const apiClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3002", // Update with your actual API URL
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	async (config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log("first", error);
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle global errors (e.g., 401 Unauthorized)
		if (error.response?.status === 401) {
			useAuthStore.getState().clearSession();
		}
		return Promise.reject(error.response.data);
	}
);

export default apiClient;
