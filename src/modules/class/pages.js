import Emitter from "tiny-emitter";
import Swup from "swup";
import SwupPreloadPlugin from "@swup/preload-plugin";

export default class extends Emitter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.pages = new Swup({
      plugins: [new SwupPreloadPlugin()],
      containers: ["data-route"],
    });

    this.listen();
  }

  listen() {
    this.pages.on("transitionStart", () => this.endTransition());
    this.pages.on("contentReplaced", () => this.startTransition());
  }

  /* ---- Transition States */

  startTransition() {
    console.log("PAGES -- start");
  }

  endTransition() {
    console.log("PAGES -- replaced");
  }
}
