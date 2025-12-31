import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";

const MedicationLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="medication" options={{ headerShown: false }} />
			<Stack.Screen
				name="add-medication"
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

export default MedicationLayout;
