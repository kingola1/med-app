import { useAuthStore } from "@/lib/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	const { hasProfile } = useAuthStore();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#000",
				tabBarInactiveTintColor: "gray",
			}}
		>
			<Tabs.Protected guard={hasProfile}>
				<Tabs.Screen
					name="home"
					options={{
						tabBarLabel: "Home",
						tabBarIcon: ({ color }) => (
							<Ionicons
								name="home-outline"
								size={24}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="(meds)"
					options={{
						tabBarLabel: "Medications",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="pill"
								size={24}
								color={color}
							/>
						),
					}}
				/>
			</Tabs.Protected>

			<Tabs.Screen
				name="(profile)"
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="person-circle-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
