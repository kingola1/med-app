import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";

const ProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="profile" options={{ headerShown: false }} />
			<Stack.Screen
				name="create-profile"
				options={{
					headerShown: false,
					presentation: "formSheet",
					sheetGrabberVisible: true,
					sheetAllowedDetents: [1],
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

export default ProfileLayout;
