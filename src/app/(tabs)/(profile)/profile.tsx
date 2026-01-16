import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useGet } from "../../../../hooks/use-api";

type UserProfile = {
	id: string;
	fullName: string;
	email: string;
	dateOfBirth: string;
	bloodGroup: string;
	genotype: string;
	height: string;
	weight: string;
	gender: string;
	countryId: string;
	phoneNumber: string;
	diagnosedWith: string;
};

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
	<View className="mb-4 border-b border-zinc-100 pb-2">
		<Text className="font-zainRegular text-base text-zinc-500">
			{label}
		</Text>
		<Text className="font-zainBold text-lg text-zinc-900">
			{value || "N/A"}
		</Text>
	</View>
);

const Profile = () => {
	const router = useRouter();
	const {
		data: profile,
		isLoading,
		error,
	} = useGet<UserProfile>(["user-profile"], "/profile");

	const handleEdit = () => {
		if (profile) {
			router.push({
				pathname: "/(tabs)/(profile)/create-profile",
				params: {
					mode: "edit",
					...profile,
				},
			});
		}
	};

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center px-6">
				<Text className="text-center font-zainRegular text-lg text-red-500">
					Failed to load profile. Please try again later.
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			className="flex-1 bg-white"
		>
			<View className="flex-row items-center justify-between border-b border-zinc-100 px-6 pb-4 pt-2">
				<Text className="font-zainBold text-3xl text-zinc-900">
					Profile
				</Text>
				<TouchableOpacity
					onPress={handleEdit}
					className="h-10 w-10 items-center justify-center rounded-full bg-zinc-50 active:bg-zinc-100"
				>
					<Feather name="edit-2" size={20} color="#18181b" />
				</TouchableOpacity>
			</View>
			<ScrollView
				className="flex-1 px-6 pt-6"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				{profile ? (
					<>
						<ProfileItem
							label="Full Name"
							value={profile.fullName}
						/>
						<ProfileItem
							label="Date of Birth"
							value={profile.dateOfBirth}
						/>
						<View className="flex-row gap-4">
							<View className="flex-1">
								<ProfileItem
									label="Gender"
									value={profile.gender}
								/>
							</View>
							<View className="flex-1">
								<ProfileItem
									label="Blood Group"
									value={profile.bloodGroup}
								/>
							</View>
						</View>
						<View className="flex-row gap-4">
							<View className="flex-1">
								<ProfileItem
									label="Genotype"
									value={profile.genotype}
								/>
							</View>
							<View className="flex-1">
								<ProfileItem
									label="Height"
									value={
										profile.height
											? `${profile.height} cm`
											: ""
									}
								/>
							</View>
						</View>
						<View className="flex-row gap-4">
							<View className="flex-1">
								<ProfileItem
									label="Weight"
									value={
										profile.weight
											? `${profile.weight} kg`
											: ""
									}
								/>
							</View>
							<View className="flex-1">
								<ProfileItem
									label="Mobile"
									value={profile.phoneNumber}
								/>
							</View>
						</View>
						<ProfileItem
							label="Diagnosed With"
							value={profile.diagnosedWith}
						/>
					</>
				) : (
					<Text className="text-center font-zainRegular text-lg text-zinc-500">
						No profile data found.
					</Text>
				)}
			</ScrollView>
		</ScrollView>
	);
};

export default Profile;
