/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			body: ['PP Eiko', 'serif'],
			heading: ['Humane', 'sans-serif'],
			special: ['Sk Pupok', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#8684E4',
					extralight: '#D7D5FF',
					light: '#B8B5EF',
					dark: '#313150',
				},
				secondary: '#DBF38C',
			},
		},
	},
	plugins: [],
};
