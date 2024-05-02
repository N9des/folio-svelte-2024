export default {
	iPadIOS13() {
		return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
	},
	isMobile() {
		return (
			/mobi|android|tablet|ipad|iphone/.test(navigator.userAgent.toLowerCase()) &&
			navigator.maxTouchPoints > 0
		);
	},
};
