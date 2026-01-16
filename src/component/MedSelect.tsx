import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	FlatList,
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

interface Country {
	id: string;
	name: string;
	code: string;
	callCode: string;
}

interface MedSelectProps {
	label: string;
	value: string; // country ID
	options: Country[];
	onChange: (countryId: string) => void;
	error?: string;
	loading?: boolean;
}

const MedSelect = ({
	label,
	value,
	options,
	onChange,
	error,
	loading,
}: MedSelectProps) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const selectedCountry = options.find((c) => c.id === value);
	const filteredOptions = options.filter((c) =>
		c.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<View className="mb-4 gap-1.5">
			<Text className="font-zainBold text-zinc-900 text-base">
				{label}
			</Text>
			<Pressable
				onPress={() => setModalVisible(true)}
				className="h-12 w-full rounded-xl border-[1px] border-zinc-900 px-4 flex-row items-center justify-between bg-white"
			>
				<Text
					className={`text-base font-zainRegular ${
						selectedCountry ? "text-zinc-900" : "text-zinc-400"
					}`}
				>
					{selectedCountry ? selectedCountry.name : "Select Country"}
				</Text>
				<Ionicons name="chevron-down" size={20} color="#18181b" />
			</Pressable>
			{error && (
				<Text className="text-sm text-red-500 font-zainItalic">
					{error}
				</Text>
			)}

			<Modal visible={modalVisible} animationType="slide">
				<SafeAreaView className="flex-1 bg-white">
					<View className="px-4 py-2 border-b border-zinc-200 flex-row items-center gap-2">
						<Pressable
							onPress={() => setModalVisible(false)}
							className="p-2"
						>
							<Ionicons name="close" size={24} color="#18181b" />
						</Pressable>
						<TextInput
							placeholder="Search country..."
							className="flex-1 h-10 bg-zinc-100 rounded-lg px-3 font-zainRegular text-base"
							value={searchQuery}
							onChangeText={setSearchQuery}
							autoFocus
						/>
					</View>

					{loading ? (
						<View className="flex-1 items-center justify-center">
							<Text className="font-zainRegular text-zinc-500">
								Loading countries...
							</Text>
						</View>
					) : (
						<FlatList
							data={filteredOptions}
							keyExtractor={(item) => item.id}
							contentContainerStyle={{ padding: 16 }}
							renderItem={({ item }) => (
								<TouchableOpacity
									className="py-3 border-b border-zinc-100"
									onPress={() => {
										onChange(item.id);
										setModalVisible(false);
										setSearchQuery("");
									}}
								>
									<View className="flex-row items-center justify-between">
										<Text className="font-zainRegular text-lg text-zinc-900">
											{item.name}
										</Text>
										<Text className="font-zainRegular text-zinc-500">
											{item.callCode}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
					)}
				</SafeAreaView>
			</Modal>
		</View>
	);
};

export default MedSelect;
