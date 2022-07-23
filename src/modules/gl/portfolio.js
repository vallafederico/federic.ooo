import PortfolioQuad from "./mod/port-item";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.create();
  }

  create() {
    const portElems = [...document.querySelectorAll("[data-work='item']")];
    this.quads = portElems.map(
      (item) => new PortfolioQuad(this.gl, { el: item })
    );
  }

  render(t, y) {
    if (this.quads) this.quads.forEach((quad) => quad.render(t, y));
  }

  resize(gl) {
    this.gl = gl;
    if (this.quads) this.quads.forEach((quad) => quad.resize(this.gl));
  }
}
