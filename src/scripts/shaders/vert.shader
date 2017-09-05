
 highp float rand(vec2 co) {
     highp float a = 12.9898;
     highp float b = 78.233;
     highp float c = 43758.5453;
     highp float dt= dot(co.xy ,vec2(a,b));
     highp float sn= mod(dt,3.14);
     return fract(sin(sn) * c);
}

varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;

void main() {

    vNormal = normal;
    vPosition = position;
    vec3 offset = position;
    /* offset[0] += sin(time); */

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(offset, 1.0);
}
