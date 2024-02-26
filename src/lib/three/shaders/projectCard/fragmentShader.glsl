uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
	vec4 baseTexture = texture2D(uTexture, vUv);

	gl_FragColor = vec4(baseTexture);

	gl_FragColor.a *= pow( gl_FragCoord.z, 0.1 );
}