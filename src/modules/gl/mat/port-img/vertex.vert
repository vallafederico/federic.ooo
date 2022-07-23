#define PI 3.1415926538
attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 u_camera;
uniform mat4 u_id;
uniform float u_time;

// setup
uniform float u_y;
uniform vec2 u_scale;
uniform vec2 u_ratio;

varying float v_time;
varying vec2 v_uv;

// animation
uniform float uA_in;
uniform float uA_hover;
uniform float uA_click;

varying float vA_hover;
varying float vA_in;
varying float vA_click;



void main() {
  vec4 pos = position;
  float r_time = u_time * 4.;

  /* -- Animations */

  // scale inview animation
  pos.xy += .2;
  pos.x *= uA_in;
  pos.xy -= .2;

  // hover animation
  pos.xy *= (1. - uA_hover * .05);

  // clicked animation
  pos.xy *= (1. - uA_click * .3); // * scale


  // dom position
  pos.xy *= u_scale;
  pos.y += u_y;
  

  /* -- Position */

  gl_Position =  u_camera * u_id * vec4(pos);

  //
  v_time = u_time;

  // set uvs for IMG
  vec2 new_uv = texcoord;
  new_uv -= vec2(.5);
  new_uv *= u_ratio;
  new_uv *= 1. - (uA_hover * .2);
  new_uv += vec2(.5);
  v_uv = new_uv;

  // animation
  vA_in = uA_in;
  vA_click = uA_click;
  // vA_hover = uA_hover;  


}

// uniform vec2 u_vs;
// uniform vec2 u_res;
// varying vec2 v_res;
// v_res = u_res;

  
