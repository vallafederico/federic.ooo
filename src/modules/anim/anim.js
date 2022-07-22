// import gsap from "gsap";
// import { anim } from "../utils/config.js";

/*
 * Animation
 */

export class Animation {
  constructor(element) {
    this.element = element;

    // displayt none gate
    if (this.element.offsetWidth === 0 || this.element.offsetHeight === 0)
      return;

    this.createObserver();
    this.start();
  }

  createObserver() {
    // in
    this.observerIn = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.animIn();
        });
      },
      {
        rootMargin: "0px",
        threshold: 1,
      }
    );

    // out
    this.observerOut = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) this.setOut();
        });
      },
      {
        rootMargin: "0px",
        threshold: 0,
      }
    );
  }

  start() {
    this.observerIn.observe(this.element);
    this.observerOut.observe(this.element);
  }

  stop() {
    this.observerIn.unobserve(this.element);
    this.observerOut.unobserve(this.element);
  }

  animIn() {}
  animOut() {}
  setIn() {}
  setOut() {}
}
