import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";
import { usePatch, usePost } from "../../../../hooks/use-api";
import MedButton from "../../../component/MedButton";
import MedDatePicker from "../../../component/MedDatePicker";
import MedInput from "../../../component/MedInput";
import MedPicker from "../../../component/MedPicker";
import MedSelect from "../../../component/MedSelect";

// Mock API for countries - in real app this would be a fetch call
const fetchCountries = async () => {
	// Simulate delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return [
		{
			id: "395e52ca-57ff-429d-8e77-7da7e1f5da24",
			name: "Afghanistan",
			code: "AF",
			callCode: "+93",
		},
		{
			id: "4c6525f7-5139-4864-904d-fd779fc61c79",
			name: "Albania",
			code: "AL",
			callCode: "+355",
		},
		{
			id: "881d460a-ea58-4d84-8b11-61168990ac09",
			name: "Algeria",
			code: "DZ",
			callCode: "+213",
		},
		// Added simulating Nigeria since it was in the user json example
		{
			id: "936e6a10-a344-4d51-971f-c7dae6a76695",
			name: "Nigeria",
			code: "NG",
			callCode: "+234",
		},
	];
};

const CreateProfile = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const mode = params.mode as string;
	const isEditMode = mode === "edit";
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);
	const [countries, setCountries] = useState<any[]>([]);

	const [form, setForm] = useState(() => {
		if (mode === "edit") {
			return {
				fullName: (params.fullName as string) || "",
				dateOfBirth: (params.dateOfBirth as string) || "",
				bloodGroup: (params.bloodGroup as string) || "",
				genotype: (params.genotype as string) || "",
				height: (params.height as unknown as number) || "",
				weight: (params.weight as unknown as number) || "",
				gender: (params.gender as string) || "",
				countryId: (params.countryId as string) || "",
				phoneNumber: (params.phoneNumber as string) || "",
				diagnosedWith: (params.diagnosedWith as string) || "",
			};
		}
		return {
			fullName: "",
			dateOfBirth: "",
			bloodGroup: "",
			genotype: "",
			height: 0,
			weight: 0,
			gender: "",
			countryId: "",
			phoneNumber: "",
			diagnosedWith: "",
		};
	});

	const { mutate: createProfile, isPending: isCreating } = usePost(
		"/profile",
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["user-profile"] });
				Alert.alert("Success", "Profile Created Successfully", [
					{
						text: "OK",
						onPress: () => {
							if (router.canGoBack()) {
								router.back();
							} else {
								router.push("/(tabs)/home");
							}
						},
					},
				]);
			},
			onError: (error: Error) => {
				toast.error(error.message || "Failed to create profile");
			},
		}
	);

	const { mutate: updateProfile, isPending: isUpdating } = usePatch(
		"/profile",
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["user-profile"] });
				Alert.alert("Success", "Profile Updated Successfully", [
					{
						text: "OK",
						onPress: () => router.back(),
					},
				]);
			},
			onError: (error: Error) => {
				toast.error(error.message || "Failed to update profile");
			},
		}
	);

	useEffect(() => {
		const loadCountries = async () => {
			try {
				setLoading(true);
				const data = await fetchCountries();
				setCountries(data);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		loadCountries();
	}, []);

	const handleChange = (key: string, value: string | number) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		const payload = {
			...form,
			height: Number(form.height),
			weight: Number(form.weight),
		};

		if (isEditMode) {
			updateProfile(payload);
		} else {
			createProfile(payload);
		}
	};

	return (
		<ScrollView
			className="flex-1 px-6 py-6"
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{ paddingBottom: 40 }}
			showsVerticalScrollIndicator={false}
		>
			<View className="mt-4 mb-6">
				<Text className="font-zainBold text-3xl text-zinc-900">
					{isEditMode ? "Edit Profile" : "Create Profile"}
				</Text>
				<Text className="font-zainRegular text-zinc-500 text-lg">
					{isEditMode
						? "Update your details below"
						: "Please enter your details to continue"}
				</Text>
			</View>

			<MedInput
				label="Full Name"
				value={form.fullName}
				onChangeText={(t) => handleChange("fullName", t)}
				placeholder="e.g. David Aremu"
			/>

			<MedDatePicker
				label="Date of Birth"
				value={form.dateOfBirth}
				onChange={(d) => handleChange("dateOfBirth", d)}
			/>

			<View className="flex-row gap-2">
				<View className="flex-1">
					<MedInput
						label="Height (CM)"
						value={form.height ? String(form.height) : ""}
						onChangeText={(t) => handleChange("height", t)}
						keyboardType="numeric"
						placeholder="e.g. 180"
					/>
				</View>
				<View className="flex-1">
					<MedInput
						label="Weight (KG)"
						value={form.weight ? String(form.weight) : ""}
						onChangeText={(t) => handleChange("weight", t)}
						keyboardType="numeric"
						placeholder="e.g. 75"
					/>
				</View>
			</View>

			<MedPicker
				label="Gender"
				options={[
					{ label: "Male", value: "male" },
					{ label: "Female", value: "female" },
					{ label: "Other", value: "other" },
				]}
				value={form.gender}
				onChange={(v) => handleChange("gender", v)}
			/>

			<View className="gap-2">
				<MedPicker
					label="Blood Group"
					options={[
						{ label: "A+", value: "A+" },
						{ label: "A-", value: "A-" },
						{ label: "B+", value: "B+" },
						{ label: "B-", value: "B-" },
						{ label: "O+", value: "O+" },
						{ label: "O-", value: "O-" },
						{ label: "AB+", value: "AB+" },
						{ label: "AB-", value: "AB-" },
					]}
					value={form.bloodGroup}
					onChange={(v) => handleChange("bloodGroup", v)}
				/>
			</View>

			<MedPicker
				label="Genotype"
				options={[
					{ label: "AA", value: "AA" },
					{ label: "AS", value: "AS" },
					{ label: "SS", value: "SS" },
					{ label: "AC", value: "AC" },
				]}
				value={form.genotype}
				onChange={(v) => handleChange("genotype", v)}
			/>

			<MedSelect
				label="Country"
				value={form.countryId}
				options={countries}
				onChange={(id) => handleChange("countryId", id)}
				loading={loading}
			/>

			<MedInput
				label="Phone Number"
				value={form.phoneNumber}
				onChangeText={(t) => handleChange("phoneNumber", t)}
				placeholder="e.g. +2348189436490"
				keyboardType="phone-pad"
			/>

			<MedInput
				label="Diagnosed With"
				value={form.diagnosedWith}
				onChangeText={(t) => handleChange("diagnosedWith", t)}
				placeholder="e.g. Hemophilia"
			/>

			<View className="mt-4">
				<MedButton
					title={isEditMode ? "Update Profile" : "Create Profile"}
					onPress={handleSubmit}
					disabled={isCreating || isUpdating}
				/>
			</View>
		</ScrollView>
	);
};

export default CreateProfile;
