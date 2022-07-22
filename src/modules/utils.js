export default class {
  constructor() {
    this.switchFav()

  }

  switchFav() {
    const link = document.querySelector('[rel="shortcut icon"]');
    const icon = {
      happy: "https://uploads-ssl.webflow.com/6198e4a975cc914676fcd9ec/61a289b5647af4bfaec4806d_fvc-fooo.svg",
      sad: "https://uploads-ssl.webflow.com/6198e4a975cc914676fcd9ec/61a28e30fc75010fb334a061_fooo-favicon-sad.svg"
    };
    window.onblur = () => (link.href = icon.sad);
    window.onfocus = () => (link.href = icon.happy);
    link.href = icon.happy;
  }
  
}
