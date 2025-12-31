import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import "../../global.css";

import { AppQueryProvider } from "@/lib/react-query";
import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const { isAuthenticated } = useAuthStore();
	const hydrate = useAuthStore((state) => state.hydrate);

	const [loaded, error] = useFonts({
		"Zain-Black": require("@/assets/fonts/Zain-Black.ttf"),
		"Zain-Bold": require("@/assets/fonts/Zain-Bold.ttf"),
		"Zain-ExtraBold": require("@/assets/fonts/Zain-ExtraBold.ttf"),
		"Zain-ExtraLight": require("@/assets/fonts/Zain-ExtraLight.ttf"),
		"Zain-Italic": require("@/assets/fonts/Zain-Italic.ttf"),
		"Zain-Light": require("@/assets/fonts/Zain-Light.ttf"),
		"Zain-LightItalic": require("@/assets/fonts/Zain-LightItalic.ttf"),
		"Zain-Regular": require("@/assets/fonts/Zain-Regular.ttf"),
	});

	useEffect(() => {
		hydrate();
	}, [hydrate]);

	return (
		// <ThemeProvider>
		<AppQueryProvider>
			<GestureHandlerRootView>
				<PressablesConfig
					globalHandlers={{
						onPress: () => {
							Haptics.selectionAsync();
						},
					}}
				>
					<StatusBar style="auto" />
					<Stack>
						<Stack.Protected guard={isAuthenticated}>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
						</Stack.Protected>
						<Stack.Protected guard={!isAuthenticated}>
							<Stack.Screen
								name="(onboarding)"
								options={{ headerShown: false }}
							/>
						</Stack.Protected>
					</Stack>
					<Toaster />
				</PressablesConfig>
			</GestureHandlerRootView>
		</AppQueryProvider>
		// </ThemeProvider>
	);
}
