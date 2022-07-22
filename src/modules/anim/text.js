import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Animation } from "./anim.js";
import { anim } from "../utils/config.js";

gsap.registerPlugin(SplitText);

/*
 * Titles
 */

export class Text extends Animation {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitWords(this.element);
  }

  animIn() {
    this.animation = gsap.to(this.animated, {
      autoAlpha: 1,
      y: "0%",
      duration: anim.in.duration,
      ease: anim.in.ease,
      delay: anim.in.delay,
      stagger: {
        each: anim.in.stagger,
        from: anim.in.from,
      },
    });
  }

  setOut() {
    if (this.animation) this.animation.kill();
    gsap.set(this.animated, { y: "200%" });
  }
}

/*
 * Splits
 */

export class Char extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitChars(this.element);
  }
}

export class Word extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitWords(this.element);
  }
}

export class Line extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitLines(this.element);
  }
}

/*
 * Utils
 */

const splitChars = (el) => {
  return new SplitText(el, {
    type: " chars, lines ",
  }).chars;
};

const splitWords = (el) => {
  return new SplitText(el, {
    type: " words, lines ",
  }).words;
};

const splitLines = (el) => {
  let e = new SplitText(el, {
    type: " lines",
  }).lines;

  return new SplitText(e, {
    type: " lines",
  }).lines;
};
