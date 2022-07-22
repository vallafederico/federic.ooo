export class Clock {
  constructor() {
    this.item = document.querySelector("[data-clock]");

    this.places = {
      it: "CET"
    };

    this.tick();
  }

  getOffsets() {
    this.offsets = {
      local: 0
    };
  }

  getDate(tz = null) {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (tz) {
      date = new Date();
      date = convertTZ(date, tz);
      hh = date.getHours();
      mm = date.getMinutes();
      ss = date.getSeconds();
    }

    // normalize w/ 0
    hh = ("0" + hh).slice(-2);
    mm = ("0" + mm).slice(-2);
    ss = ("0" + ss).slice(-2);

    return { hh, mm, ss };
  }

  tick() {
    setInterval((_) => {
      const dates = this.getDate(this.places.it);
      this.updateDom(dates);
    }, 1000);
  }

  updateDom({ hh, mm, ss }) {
    this.item.textContent = `${hh}:${mm}:${ss}`;
  }
}

/**
 * Utils
 */
function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString
    })
  );
}
