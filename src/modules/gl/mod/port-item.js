import gsap from "gsap";
import {
  createProgramInfo,
  drawBufferInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
} from "twgl.js";

import Quad from "./_quad.js";
import shaders from "../mat/port-img/";

import Watch from "../../utils/watch.js";

import { calcDomPosition } from "../utils/dom-utils.js";
import { loadTextureAndData, calcRatio } from "../utils/texture-loader.js";

export default class extends Quad {
  constructor(gl, { el }) {
    super(gl, {});
    this.gl = gl;

    this.setA();

    this.ref = {
      wrap: el,
      quad: el.querySelector("[data-quad]"),
      ovly: el.querySelector("[data-item='ovly']"),
    };

    this.texture = { texture: null, ratio: [1, 1] };
    this.loadTexture();

    this.initEvents();
  }

  loadTexture() {
    // get texture from dom
    const loadedData = loadTextureAndData(
      this.gl,
      this.ref.quad.children[0],
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

    const pos = calcDomPosition(this.ref.quad, this.gl.vp);
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
      // basic
      u_time: t,
      u_id: this.mat,
      u_y: y,
      // texture
      u_diff: this.texture.texture,
      u_ratio: this.texture.ratio,
      // anim
      uA_in: this.a.in,
      uA_hover: this.a.hover,
      uA_click: this.a.click,
    });

    drawBufferInfo(this.gl, this.bufferInfo);
    // this.gl.LINES
  }

  /* -----  Events */

  initEvents() {
    this.watch = new Watch(this.ref.quad);
    this.watch.on("in", () => this.animateIn());
    this.watch.on("out", () => this.animateOut());

    this.ref.ovly.onmouseenter = () => this.hoverIn();
    this.ref.ovly.onmouseleave = () => this.hoverOut();
    this.ref.ovly.onclick = () => this.onClick();
  }

  /* -----  Animation */
  setA() {
    this.a = {
      // inview
      in: 0,
      inA: null,
      // hover
      hover: 0,
      hoverA: null,
      // click
      click: 0,
      clickA: null,
    };
  }

  animateIn() {
    if (this.a.inA) this.a.inA.kill();
    const r = Math.random() * 0.3;

    this.a.inA = gsap.to(this.a, {
      in: 1,
      duration: 1.2,
      ease: "expo",
      delay: r,
    });
  }

  animateOut() {
    if (this.a.inA) this.a.inA.kill();
    this.a.inA = gsap.set(this.a, { in: 0 });

    // + reset click on scroll away
    if (this.a.clickA) this.a.clickA.kill();
    this.a.click = 0;
  }

  hoverIn() {
    if (this.a.hoverA) this.a.hoverA.kill();
    this.a.hoverA = gsap.to(this.a, {
      hover: 1,
      duration: 1.1,
      ease: "expo.out",
    });
  }

  hoverOut() {
    if (this.a.hoverA) this.a.hoverA.kill();
    this.a.hoverA = gsap.to(this.a, {
      hover: 0,
      duration: 0.6,
      ease: "expo.out",
    });
  }

  onClick() {
    const val = this.a.click > 0.5 ? 0 : 1;
    this.a.clickA = gsap.to(this.a, {
      click: val,
      duration: 1.2,
      ease: "expo.out",
    });
  }
}
