import React from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";

interface MedInputProps extends TextInputProps {
	label: string;
	error?: string;
}

const MedInput = ({ label, error, className, ...props }: MedInputProps) => {
	return (
		<View className="mb-4 gap-1.5">
			<Text className="font-zainBold text-zinc-900 text-base">
				{label}
			</Text>
			<TextInput
				placeholderTextColor="#a1a1aa"
				className={`h-12 w-full rounded-xl border-[1px] border-zinc-900 px-4 text-base font-zainRegular text-zinc-900 flex-row items-center justify-center ${className}`}
				{...props}
			/>
			{error && (
				<Text className="text-sm text-red-500 font-zainItalic">
					{error}
				</Text>
			)}
		</View>
	);
};

export default MedInput;
