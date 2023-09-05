precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform float uOffset;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacementTexture;

varying vec2 vUv;
varying vec2 vUvMap1;
varying vec2 vUvMap2;

void main() {
  vec4 texture1 = texture2D(uTexture1, vUvMap1);
  vec4 texture2 = texture2D(uTexture2, vUvMap2);

  vec4 displacementTexture = texture2D(uDisplacementTexture, vUv);

  gl_FragColor = displacementTexture;
}