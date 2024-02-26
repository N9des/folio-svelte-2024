/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			display: 'PP Eiko',
			heading: 'Humane',
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#8684E4',
					light: '#B8B5EF',
				},
				secondary: '#DBF38C',
			},
		},
	},
	plugins: [],
};
