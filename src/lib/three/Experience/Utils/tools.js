export default {
	rand: (min, max) => Math.random() * (max - min) + min,
	lerp: (s, e, v) => s * (1 - v) + e * v,
	clamp: (num, min, max) => Math.min(Math.max(num, min), max),
};
