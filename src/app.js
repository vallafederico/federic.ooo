import Scroll from "./modules/scroll.js";
import Preloader from "./modules/preloader.js";
import VpInt from "./modules/class/inview.js";
import Dom from "./modules/class/dom.js";

import { isTablet } from "./modules/utils/agents.js";

export default class App {
  constructor() {
    this.ag = isTablet();
    this.load();
  }

  load() {
    this.prel = new Preloader();
    this.prel.on("done", () => this.init());
    this.prel.start();
  }

  init() {
    // persistent
    this.scroll = new Scroll(this.ag);
    this.ui = new VpInt("[data-ui]", "inview");

    // dom
    this.dom = new Dom();
    this.initEvents();

    this.raf();
  }

  initEvents() {
    // window.addEventListener("resize", this.setResize.bind(this));
  }

  raf() {
    if (this.scroll) this.scroll.raf();

    window.requestAnimationFrame(this.raf.bind(this));
  }

  /* Resize
   **/
}

new App();
