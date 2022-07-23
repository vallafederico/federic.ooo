import Portfolio from "./portfolio";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.create();
  }

  create() {
    this.portfolio = new Portfolio(this.gl);
    // this.quad = new Quad(this.gl);
  }

  render(t, y) {
    if (this.portfolio) this.portfolio.render(t, y);
    // if (this.quad) this.quad.render(t);
  }

  resize(gl) {
    this.gl = gl;
    if (this.portfolio) this.portfolio.resize(this.gl);
    // if (this.quad) this.quad.resize(this.gl);
  }
}
