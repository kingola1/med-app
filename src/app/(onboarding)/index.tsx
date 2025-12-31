import MedButton from "@/src/component/MedButton";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
	const router = useRouter();
	return (
		<SafeAreaView className="flex-1 items-center justify-end bg-gray-50">
			<View></View>

			<View className="w-full items-center justify-end">
				<Text className="text-3xl font-zainBold text-gray-900">
					Remed
				</Text>
				<Text className="text-base font-zainItalic text-gray-900">
					Your Personal Health Assistant
				</Text>
				<Text className="text-base font-zainLight text-gray-900">
					Stay on track with your medications.
				</Text>

				<MedButton
					onPress={() => {
						router.push("/signin");
					}}
					title="Get Started"
					className="w-[80%] mt-8"
				/>
			</View>
		</SafeAreaView>
	);
};

export default Onboarding;
