import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface MedDatePickerProps {
	label: string;
	value: string; // YYYY-MM-DD
	onChange: (date: string) => void;
	error?: string;
}

const months = [
	{ label: "Jan", value: "01" },
	{ label: "Feb", value: "02" },
	{ label: "Mar", value: "03" },
	{ label: "Apr", value: "04" },
	{ label: "May", value: "05" },
	{ label: "Jun", value: "06" },
	{ label: "Jul", value: "07" },
	{ label: "Aug", value: "08" },
	{ label: "Sep", value: "09" },
	{ label: "Oct", value: "10" },
	{ label: "Nov", value: "11" },
	{ label: "Dec", value: "12" },
];

const MedDatePicker = ({
	label,
	value,
	onChange,
	error,
}: MedDatePickerProps) => {
	const [selectedYear, setSelectedYear] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("");
	const [selectedDay, setSelectedDay] = useState("");

	useEffect(() => {
		if (value) {
			const [y, m, d] = value.split("-");
			setSelectedYear(y);
			setSelectedMonth(m);
			setSelectedDay(d);
		}
	}, [value]);

	const updateDate = (y: string, m: string, d: string) => {
		if (y && m && d) {
			onChange(`${y}-${m}-${d}`);
		}
		setSelectedYear(y);
		setSelectedMonth(m);
		setSelectedDay(d);
	};

	const years = Array.from({ length: 100 }, (_, i) => {
		const y = new Date().getFullYear() - i;
		return { label: String(y), value: String(y) };
	});

	const getDaysInMonth = (year: string, month: string) => {
		if (!year || !month) return 31;
		return new Date(parseInt(year), parseInt(month), 0).getDate();
	};

	const days = Array.from(
		{ length: getDaysInMonth(selectedYear, selectedMonth) },
		(_, i) => {
			const d = String(i + 1).padStart(2, "0");
			return { label: d, value: d };
		}
	);

	const SelectScroll = ({
		options,
		selected,
		onSelect,
	}: {
		options: { label: string; value: string }[];
		selected: string;
		onSelect: (val: string) => void;
	}) => (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ gap: 8 }}
			className="flex-grow-0"
		>
			{options.map((opt) => (
				<Pressable
					key={opt.value}
					onPress={() => onSelect(opt.value)}
					className={`h-10 px-3 rounded-xl border-[1px] items-center justify-center ${
						selected === opt.value
							? "bg-zinc-900 border-zinc-900"
							: "bg-white border-zinc-300"
					}`}
				>
					<Text
						className={`text-base font-zainRegular ${
							selected === opt.value
								? "text-white"
								: "text-zinc-700"
						}`}
					>
						{opt.label}
					</Text>
				</Pressable>
			))}
		</ScrollView>
	);

	return (
		<View className="mb-4 gap-2">
			<Text className="font-zainBold text-zinc-900 text-base">
				{label}
			</Text>

			<View>
				<Text className="text-xs text-zinc-500 mb-1 font-zainRegular">
					Year
				</Text>
				<SelectScroll
					options={years}
					selected={selectedYear}
					onSelect={(y) => updateDate(y, selectedMonth, selectedDay)}
				/>
			</View>

			<View>
				<Text className="text-xs text-zinc-500 mb-1 font-zainRegular">
					Month
				</Text>
				<SelectScroll
					options={months}
					selected={selectedMonth}
					onSelect={(m) => updateDate(selectedYear, m, selectedDay)}
				/>
			</View>

			<View>
				<Text className="text-xs text-zinc-500 mb-1 font-zainRegular">
					Day
				</Text>
				<SelectScroll
					options={days}
					selected={selectedDay}
					onSelect={(d) => updateDate(selectedYear, selectedMonth, d)}
				/>
			</View>

			{error && (
				<Text className="text-sm text-red-500 font-zainItalic">
					{error}
				</Text>
			)}
		</View>
	);
};

export default MedDatePicker;
