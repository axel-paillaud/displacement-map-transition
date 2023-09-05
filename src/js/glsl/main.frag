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

const float displacementCoef = 0.4;

void main() {
/*   vec4 texture1 = texture2D(uTexture1, vUvMap1);
  vec4 texture2 = texture2D(uTexture2, vUvMap2); */
  vec4 displacementTexture = texture2D(uDisplacementTexture, vUv);

  // get displacement force based of one color canal of the image, then use uProgram
  float displaceForce1 = displacementTexture.r * uOffset * displacementCoef;
  vec2 uvDisplaced1 = vec2(vUvMap1.x + displaceForce1, vUvMap1.y + displaceForce1);
  vec4 displacedTexture1 = texture2D(uTexture1, uvDisplaced1);

  float displaceForce2 = displacementTexture.r * ( 1. - uOffset ) * displacementCoef;
  vec2 uvDisplaced2 = vec2(vUvMap2.x - displaceForce2, vUvMap2.y - displaceForce2);
  vec4 displacedTexture2 = texture2D(uTexture2, uvDisplaced2);

  gl_FragColor = displacedTexture2;
}