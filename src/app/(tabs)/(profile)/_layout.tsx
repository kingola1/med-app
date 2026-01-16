import { useAuthStore } from "@/lib/store";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";

const ProfileLayout = () => {
	const { hasProfile } = useAuthStore();
	return (
		<Stack>
			<Stack.Protected guard={hasProfile}>
				<Stack.Screen name="profile" options={{ headerShown: false }} />
			</Stack.Protected>
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
