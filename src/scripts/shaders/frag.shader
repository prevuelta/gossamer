// #ifdef GL_ES
// precision highp float;
// #endif

// varying vec2 vUv;
// varying float noise;

// varying vec3 col;

highp float rand(vec2 co) {
     highp float a = 12.9898;
     highp float b = 78.233;
     highp float c = 43758.5453;
     highp float dt= dot(co.xy ,vec2(a,b));
     highp float sn= mod(dt,3.14);
     return fract(sin(sn) * c);
 }

// same name and type as VS

float random( vec2 p ) {
  // We need irrationals for pseudo randomness.
  // Most (all?) known transcendental numbers will (generally) work.
  const vec2 r = vec2(
    23.1406926327792690,  // e^pi (Gelfond's constant)
     2.6651441426902251); // 2^sqrt(2) (Gelfond–Schneider constant)
  return fract( cos( mod( 123456789., 1e-7 + 256. * dot(p,r) ) ) );
}


varying vec3 vNormal;
varying vec3 vPosition;

void main() {
      gl_FragColor = vec4(vNormal, 1.0);
}

