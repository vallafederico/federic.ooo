import {
  createProgramInfo,
  drawBufferInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
} from "twgl.js";

import { calcDomPosition } from "../utils/dom-utils.js";
import { loadTextureAndData, calcRatio } from "../utils/texture-loader.js";

import Quad from "./_quad.js";
import shaders from "../mat/port-img/";

export default class extends Quad {
  constructor(gl, ref) {
    super(gl, {});

    this.gl = gl;
    this.ref = ref;
    this.texture = { texture: null, ratio: [1, 1] };
    this.loadTexture();
  }

  loadTexture() {
    // get texture from dom
    const loadedData = loadTextureAndData(
      this.gl,
      this.ref.children[0],
      this.gl.LINEAR
    );
    this.texture = loadedData;
  }

  createProgram() {
    this.shaders = shaders;
    this.programInfo = createProgramInfo(this.gl, this.shaders);
  }

  resize(gl) {
    this.gl = gl;

    const pos = calcDomPosition(this.ref, this.gl.vp);
    m4.translation([pos.x, pos.y, 0], this.mat);

    this.gl.useProgram(this.programInfo.program);
    setUniforms(this.programInfo, {
      u_res: [gl.canvas.width, gl.canvas.height],
      u_vs: gl.vp.viewSize,
      u_id: this.mat,
      u_camera: gl.camera.mat,
      u_scale: [pos.width, pos.height],
    });
  }

  render(t, y) {
    this.gl.useProgram(this.programInfo.program);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    setUniforms(this.programInfo, {
      u_time: t,
      u_id: this.mat,
      u_y: y,
      u_diff: this.texture.texture,
      u_ratio: this.texture.ratio,
    });

    drawBufferInfo(this.gl, this.bufferInfo);
    // this.gl.LINES
  }
}
