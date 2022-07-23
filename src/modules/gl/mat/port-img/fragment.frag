precision mediump float;

uniform sampler2D u_diff;  


varying float v_time;
varying vec2 v_uv;

// animation
varying float vA_in;
// varying float vA_hover;
varying float vA_click;

 

void main() {
    vec2 uv = v_uv;
    uv.x *= vA_in;

    vec4 img = texture2D(u_diff, uv);
    // vec3 bw_img = 


    gl_FragColor.rgb = img.rgb;
    gl_FragColor.a = img.a;
}

// vec2 st = gl_FragCoord.xy/v_res.xy;





/**/
// varying vec2 v_res;