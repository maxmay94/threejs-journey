uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vElevation;
varying vec2 vUv;

void main() { 
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x -uTime) * 0.1;

  modelPosition.z += elevation;
  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  vUv = uv;
  vElevation = elevation;
}