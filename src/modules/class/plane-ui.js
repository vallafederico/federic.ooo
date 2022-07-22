import gsap from 'gsap'

export default class {
  constructor(data = {}) {
    this.data = data
    this.glTrans = { x: 0 };

    // this.create()

  }

  create() {
    // console.log('created');
    this.utils() // utilities

    // overlays
    const overlay = this.data.element.querySelector('[data-content-o]')
    if (overlay !== null) this.createVideoOverlay(overlay)

  }

  /* Overlays
  */

  createVideoOverlay(item) {
    const src = item.getAttribute('data-cont-o-src')
    if (!src) return
    const dom = document.querySelector('[data-overlay="video"]')

    dom.onended = () => this.videoEnded(dom)

    item.onmouseenter = () => {
      if (dom.src === src) return
      dom.src = src;
    }

    item.onclick = (e) => {
      e.stopPropagation()
      this.videoStarted(dom)
    }

  }

  videoStarted(dom) {
    gsap.set(dom, { autoAlpha: 0 })
    dom.style.display = 'flex'
    dom.currentTime = 0;

    this.hideShowDom()

    gsap.to(this.glTrans, {
      x: 1,
      duration: 1,
      ease: 'expo.out',
      onComplete: () => {
        gsap.to(dom, {
          autoAlpha: 1,
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => dom.play()
        })
      }
    })

  }

  videoEnded(dom) {
    this.hideShowDom()
    gsap.to(dom, {
      autoAlpha: 0,
      duration: .5,
      ease: 'power2',
      onComplete: () => {
        dom.style.display = 'none'
        gsap.to(this.glTrans, {
          x: 0,
          duration: 1.5,
          ease: 'power3'
        })
      }
    })

  }

  hideShowDom() {
    [...document.querySelectorAll(".inview")].forEach((item) => {
      item.classList.toggle("an-out");
    });
  }


  /* DOM
  Utilities */

  utils() {
     // link propagation
    preventPropagation([...this.data.element.querySelectorAll('a')])

  }

}


/*
IMPROVEMENTS
1. Potentially start up the overlay only on first click (one above)
2. properly handle network request for video onhover!

*/








/* OOS Utils */

function preventPropagation(arr) {
  arr.forEach((item) => {
    item.addEventListener('click', (e) => e.stopPropagation() )
  });
}
