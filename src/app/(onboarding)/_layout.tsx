import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import React from "react";

const OnboardingLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="signin"
				options={{
					headerShown: false,
					presentation: "formSheet",
					sheetGrabberVisible: true,
					sheetAllowedDetents: [0.7, 1],
					contentStyle: {
						backgroundColor: isLiquidGlassAvailable()
							? "transparent"
							: "white",
					},
				}}
			/>
			<Stack.Screen
				name="signup"
				options={{
					headerShown: false,
					presentation: "formSheet",
					sheetGrabberVisible: true,
					sheetAllowedDetents: [0.7, 1],
					contentStyle: {
						backgroundColor: isLiquidGlassAvailable()
							? "transparent"
							: "white",
					},
				}}
			/>
		</Stack>
	);
};

export default OnboardingLayout;
