uniform sampler2D uCloud;
uniform sampler2D uDisplacement;
uniform float uProgress;

varying vec2 vUv;

const float uIntensity = 0.1;

void main() {
	vec4 cloud = texture2D(uCloud, vUv);

	vec4 displacementMap = texture2D(uDisplacement, vec2(vUv.x, vUv.y * uProgress));

	float displacedEffect = clamp((displacementMap.r - uProgress) * 20.,0., 1.);

	gl_FragColor = cloud * displacedEffect;
}