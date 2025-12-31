import { useAuthStore } from "@/lib/store";
import MedButton from "@/src/component/MedButton";
import React from "react";
import { ScrollView, Text } from "react-native";

const home = () => {
	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Home</Text>
			<MedButton
				title="Logout"
				onPress={() => {
					useAuthStore.getState().clearSession();
				}}
				className="w-[60%] mt-8"
			/>
		</ScrollView>
	);
};

export default home;
