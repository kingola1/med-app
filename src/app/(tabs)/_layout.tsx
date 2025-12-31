import { useAuthStore } from "@/lib/store";
import { Tabs } from "expo-router";

export default function TabLayout() {
	const { hasProfile } = useAuthStore();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#000",
				// tabBarInactiveTintColor: "#000",
			}}
		>
			<Tabs.Protected guard={hasProfile}>
				<Tabs.Screen
					name="home"
					options={{
						tabBarLabel: "Home",
					}}
				/>
				<Tabs.Screen
					name="(meds)"
					options={{
						tabBarLabel: "Medications",
					}}
				/>
			</Tabs.Protected>

			<Tabs.Screen
				name="(profile)"
				options={{
					tabBarLabel: "Profile",
				}}
			/>
		</Tabs>
	);
}
