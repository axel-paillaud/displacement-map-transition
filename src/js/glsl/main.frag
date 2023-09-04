precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform float uOffset;
unfiform sampler2D uTexture1;

varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(uTexture1, vUv);
}