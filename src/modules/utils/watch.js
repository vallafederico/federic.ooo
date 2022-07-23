import Emitter from "tiny-emitter";

export default class extends Emitter {
  constructor(el) {
    super();

    this.el = el;
    this.setup();

    this.observerIn.observe(this.el);
    this.observerOut.observe(this.el);
  }

  setup() {
    this.observerIn = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.emit("in");
        });
      },
      {
        root: null,
        threshold: 0.7,
        rootMargin: "0% 0% 0% 0%",
      }
    );

    this.observerOut = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) this.emit("out");
        });
      },
      {
        root: null,
        threshold: 0.0,
        rootMargin: "0% 0% 0% 0%",
      }
    );
  }
}
