import Scroll from "./modules/scroll.js";
import Preloader from "./modules/preloader.js";
import VpInt from "./modules/class/inview.js";
import Dom from "./modules/class/dom.js";
import Utils from "./modules/utils.js";
import Gl from "./modules/gl/gl";
import { Router } from "./modules/router";

import { isTablet } from "./modules/utils/agents.js";

export default class App {
  constructor() {
    this.ag = isTablet();
    this.load();
  }

  load() {
    this.utils = new Utils(this.ag);

    this.prel = new Preloader();
    this.prel.on("done", () => this.init());
    this.prel.start();
  }

  init() {
    // persistent
    this.scroll = new Scroll(this.ag);
    this.ui = new VpInt("[data-ui]", "inview");
    this.gl = new Gl();

    // dom
    this.dom = new Dom();

    this.router = new Router();
    this.router.on("T_START", (data) => this.onRouteChange(data));

    this.initEvents();

    this.raf();
  }

  onRouteChange({ current, next }) {
    // console.log(current, next);

    this.dom.toggleCSSAnimation().then(() => {
      this.router.swap();
      if (this.scroll) this.scroll.scrollTo(0, true);
    });
  }

  initEvents() {
    // window.addEventListener("resize", this.setResize.bind(this));
  }

  raf() {
    if (this.scroll) this.scroll.raf();

    if (this.gl) this.gl.render(this.scroll.y);

    window.requestAnimationFrame(this.raf.bind(this));
  }

  /* Resize
   **/
}

new App();
