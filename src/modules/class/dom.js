import { Word, Line } from "../anim/text.js";
import { Alpha } from "../anim/appear.js";
import VpInt from "./inview.js";

export default class {
  constructor() {
    this.w = document.querySelector("[data-route]").parentElement;
    this.create();
  }

  create() {
    // dom animations
    this.titles = this.processWord('[data-dom="word"]');
    this.alphas = this.processAlpha('[data-dom="alpha"]');

    // css animations
    this.inv = new VpInt(); // move to specific section!
  }

  animateIn() {
    this.inv.init();
  }

  animateOut() {
    this.inv.stop();
  }

  toggleCSSAnimation() {
    return new Promise((resolve) => {
      this.w.classList.toggle("an-out");
      // this.animateOut();

      const duration = parseInt(this.w.children[0].dataset.transition);
      console.log(this.w, this.w.children[0], duration);

      setTimeout(() => {
        this.w.classList.toggle("an-out");
        // this.animateIn();

        resolve();
      }, duration);
    });
  }

  /* Animations */
  processWord(selector) {
    return [...document.querySelectorAll(selector)].map((item) => {
      return new Word(item);
    });
  }

  processAlpha(selector) {
    return [...document.querySelectorAll(selector)].map((item) => {
      return new Alpha(item);
    });
  }
}

// /* Utilities */
// prepareOverlays() {
//   document.querySelector('[data-overlay]').style.display = 'none';
//
// }
