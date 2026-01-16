import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface Option {
	label: string;
	value: string;
}

interface MedPickerProps {
	label: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	error?: string;
}

const MedPicker = ({
	label,
	options,
	value,
	onChange,
	error,
}: MedPickerProps) => {
	return (
		<View className="mb-4 gap-1.5">
			<Text className="font-zainBold text-zinc-900 text-base">
				{label}
			</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 8 }}
			>
				{options.map((option) => (
					<Pressable
						key={option.value}
						onPress={() => onChange(option.value)}
						className={`h-10 px-4 rounded-full border-[1px] items-center justify-center ${
							value === option.value
								? "bg-zinc-900 border-zinc-900"
								: "bg-white border-zinc-300"
						}`}
					>
						<Text
							className={`text-base font-zainRegular ${
								value === option.value
									? "text-white"
									: "text-zinc-700"
							}`}
						>
							{option.label}
						</Text>
					</Pressable>
				))}
			</ScrollView>
			{error && (
				<Text className="text-sm text-red-500 font-zainItalic">
					{error}
				</Text>
			)}
		</View>
	);
};

export default MedPicker;
