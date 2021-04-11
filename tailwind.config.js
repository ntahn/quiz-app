module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"light-blue": "#8fd6e1",
				"medium-blue": "#1597bb",
				"heavy-blue": "#150e56",
				"roma-red": "#7b113a",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
