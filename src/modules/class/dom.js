import { Word, Line } from '../anim/text.js'
import { Alpha } from '../anim/appear.js'
import VpInt from "./inview.js";


export default class {
  constructor() {


    this.create()
  }

  create() {
    // dom animations
    this.titles = this.processWord('[data-dom="word"]');
    this.alphas = this.processAlpha('[data-dom="alpha"]');

    // css animations
    this.inv = new VpInt() // move to specific section!
  }

  animateOut() {
    this.inv.stop();

  }


  /* Animations
  */
  processWord(selector) {
    return [...document.querySelectorAll(selector)].map((item) => {
      return new Word(item)
    })
  }

  processAlpha(selector) {
    return [...document.querySelectorAll(selector)].map((item) => {
      return new Alpha(item)
    })
  }

}







// /* Utilities */
// prepareOverlays() {
//   document.querySelector('[data-overlay]').style.display = 'none';
//
// }
