/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/app/**/*.{js,jsx,ts,tsx}",
		"./src/component/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		fontFamily: {
			zainLight: ["Zain-Light", "sans-serif"],
			zainLightItalic: ["Zain-LightItalic", "sans-serif"],
			zainRegular: ["Zain-Regular", "sans-serif"],
			zainItalic: ["Zain-Italic", "sans-serif"],
			zainBold: ["Zain-Bold", "sans-serif"],
			zainExtraBold: ["Zain-ExtraBold", "sans-serif"],
			zainBlack: ["Zain-Black", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
