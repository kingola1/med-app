import { getItem, removeItem, setItem } from "@/lib/storage";
import { create } from "zustand";

interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	hasProfile: boolean;
	setSession: (token: string, hasProfile: boolean) => Promise<void>;
	clearSession: () => Promise<void>;
	hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	isAuthenticated: false,
	hasProfile: false,
	setSession: async (token: string, hasProfile: boolean) => {
		await setItem("user_token", token);
		await setItem("has_profile", hasProfile.toString());
		set({ token, isAuthenticated: true, hasProfile });
	},
	clearSession: async () => {
		await removeItem("user_token");
		await removeItem("has_profile");
		set({ token: null, isAuthenticated: false, hasProfile: false });
	},
	hydrate: async () => {
		const token = await getItem("user_token");
		const hasProfile = await getItem("has_profile");
		if (token) {
			set({
				token,
				isAuthenticated: true,
				hasProfile: hasProfile === "true",
			});
		}
	},
}));
