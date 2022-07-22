import gsap from "gsap";
import Emitter from "tiny-emitter";

export default class extends Emitter {
  constructor() {
    super();
    this.num = document.querySelector('[data-prel="num"]');
    this.val = { s: 1993 };
  }

  start() {
    gsap.to(this.val, {
      s: 2022,
      duration: 0.5,
      delay: 0.1,
      ease: "expo.in",
      onUpdate: () => {
        this.num.textContent = Math.floor(this.val.s);
      },
      onComplete: () => {
        this.emit("done");
      },
    });
  }
}
