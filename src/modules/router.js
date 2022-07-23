import Emitter from "tiny-emitter";

export default class extends Emitter {
  constructor() {
    super();

    this.current = {
      host: window.location.origin,
      path: window.location.pathname,
    };

    console.log(this.current);

    this.utils = new Utils();
    this.init();
  }

  init() {
    this.getAndSetLinks();
  }

  /**
   * Page IN loop
   */

  getAndSetLinks() {
    const selector = `a:not([target]):not([data-router-disabled])`;

    const pageLinks = document.querySelectorAll(selector);

    this.links = [];
    for (const link of pageLinks) {
      if (link.pathname !== this.current.path) {
        console.log(link.host, this.current.host);
        this.links.push(link);
      }
    }

    this.links.forEach((link) => {
      console.log(link, link.pathname, link.host);
    });
  }
}

/**

1. Init First Time

2. Ev ent sequence for all pages
-   Get Links
-   Add Event Listeners
-   Setup MAP cache

-----------
onhover = () => (prefetch > to MAP)
onclick = () => -> {
  - 3
  - REMOVE PAST EVENT LISTENERS
  (((EMIT))) "transition out start"
}
-----------

3.  Transition
-   Fetch New page
-   Swap Pages

4.  restart from 1.a

*/

/* Utils */

class Utils {
  constructor() {
    this.PARSER = new window.DOMParser();
  }
}
