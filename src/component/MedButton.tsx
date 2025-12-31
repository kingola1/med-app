import { Pressable, Text, type PressableProps } from "react-native";

interface Props extends PressableProps {
	title: string;
	className?: string;
	variant?: "primary" | "secondary" | "outline";
}

const MedButton = ({
	title,
	className,
	variant = "primary",
	...props
}: Props) => {
	const getContainerStyles = () => {
		switch (variant) {
			case "outline":
				return "bg-transparent border-[1px] border-zinc-900";
			case "secondary":
				return "bg-zinc-100";
			default:
				return "bg-zinc-900";
		}
	};

	const getTextStyles = () => {
		switch (variant) {
			case "outline":
			case "secondary":
				return "text-zinc-900";
			default:
				return "text-white";
		}
	};

	return (
		<Pressable
			className={`h-14 items-center justify-center rounded-2xl active:opacity-90 ${getContainerStyles()} ${className}`}
			{...props}
		>
			<Text className={`font-zainBold text-lg ${getTextStyles()}`}>
				{title}
			</Text>
		</Pressable>
	);
};

export default MedButton;
