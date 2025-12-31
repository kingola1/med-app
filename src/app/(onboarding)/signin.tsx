import { usePost } from "@/hooks/use-api";
import { useAuthStore } from "@/lib/store";
import MedButton from "@/src/component/MedButton";
import MedInput from "@/src/component/MedInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

type SigninPayload = {
	email: string;
	password: string;
};

type SigninResponse = {
	accessToken: string;
	refreshToken: string;
	hasProfile: boolean;
};

const Signin = () => {
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { mutate, isPending } = usePost<SigninResponse, SigninPayload>(
		"/auth/login",
		{
			onSuccess: (data) => {
				useAuthStore
					.getState()
					.setSession(data.accessToken, data.hasProfile);
				toast.success("Login successful");
				// router.replace("/(tabs)");
			},
			onError: (error) => {
				toast.error(
					error.message || "Something went wrong. Please try again."
				);
			},
		}
	);

	const handleSignin = () => {
		mutate({
			email,
			password,
		});
	};

	return (
		<SafeAreaView className="flex-1">
			<ScrollView contentContainerClassName="flex-grow justify-center px-6 py-12">
				<View className="mb-8">
					<Text className="text-3xl font-zainBold text-zinc-900">
						Welcome Back
					</Text>
					<Text className="mt-2 text-base font-zainRegular text-zinc-600">
						Sign in to continue your health journey.
					</Text>
				</View>

				<View className="gap-4">
					<MedInput
						label="Email"
						placeholder="Enter your email"
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
						keyboardType="email-address"
					/>
					<MedInput
						label="Password"
						placeholder="Enter your password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<MedButton
					title="Sign In"
					onPress={handleSignin}
					className="mt-8"
					disabled={isPending}
				/>

				<View className="mt-4 gap-4">
					<View className="flex-row items-center gap-4">
						<View className="h-[1px] flex-1 bg-zinc-200" />
						<Text className="font-zainRegular text-zinc-400">
							OR
						</Text>
						<View className="h-[1px] flex-1 bg-zinc-200" />
					</View>

					<MedButton
						title="Sign in with Google"
						variant="outline"
						onPress={() => {
							// TODO: Implement Google Sign-In
							toast.info("Google Sign-In coming soon");
						}}
					/>
				</View>

				<View className="mt-6 flex-row justify-center gap-1">
					<Text className="text-zinc-600 font-zainRegular">
						Don't have an account?
					</Text>
					<Pressable onPress={() => router.replace("/signup")}>
						<Text className="text-zinc-900 font-zainBold">
							Sign Up
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Signin;
