export default class {
  constructor(ag = false) {
    this.ag = ag;
    this.switchFav();

    if (!this.ag) this.scrambleWork();
  }

  switchFav() {
    const link = document.querySelector('[rel="shortcut icon"]');
    const icon = {
      happy:
        "https://uploads-ssl.webflow.com/6198e4a975cc914676fcd9ec/61a289b5647af4bfaec4806d_fvc-fooo.svg",
      sad: "https://uploads-ssl.webflow.com/6198e4a975cc914676fcd9ec/61a28e30fc75010fb334a061_fooo-favicon-sad.svg",
    };
    window.onblur = () => (link.href = icon.sad);
    window.onfocus = () => (link.href = icon.happy);
    link.href = icon.happy;
  }

  scrambleWork() {
    const rand = Math.floor(Math.random() * 3);
    const classArr = [
      ["layout-l", null],
      ["layout-r", null],
      ["layout-rr", null],
      ["layout-ll", "layout-up"],
      ["layout-r", null],
    ];

    const arrays = [...document.querySelectorAll('[data-work="main"]')];
    const newArr = arrays.map((item) => [...item.children]);
    newArr.forEach((item) => assignClassToArray(item));
  }
}

function assignClassToArray(array) {
  const rand = Math.floor(Math.random() * 4);
  const classArr = [
    ["layout-l", null],
    ["layout-r", null],
    ["null", null],
    ["layout-rr", null],
    ["layout-ll", "layout-up"],
    ["layout-rr", null],
  ];

  array.forEach((item, i) => {
    const base = i + rand;
    const val1 = classArr[base % classArr.length][0],
      val2 = classArr[base % classArr.length][1];

    // console.log(base % classArr.length, val1, val2);
    item.classList.add(val1, val2);
  });
}
