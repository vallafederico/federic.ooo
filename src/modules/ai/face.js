import { getWebcam } from "./webcam.js";
import Emitter from "tiny-emitter";
const faceapi = require("face-api.js");
import { loadFaceModels } from "./loadmodels.js";

export default class extends Emitter {
  constructor() {
    super();
    this.init();
    // this.isloaded = false;
  }

  init() {
    loadFaceModels().then(() => {
      this.findVideo()
      // this.isloaded = true;
    });
  }

  findVideo() {
    getWebcam().then((video) => {
      this.vid = video;
      this.vid.onplay = () => this.tick(this.vid);
    });

  }

  tick() {
    this.ticker = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(this.vid, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      this.detected(detections);
    }, 800);
  }

  pause() {
    clearInterval(this.ticker);
  }

  detected(det) {
    if (det.length < 1) return;

    // neutral, happy, sad, angry, fearful
    const { happy, sad, neutral, surprised } = det[0].expressions;
    //this.drawEmotions(happy, sad, surprised, neutral);
    this.emit("read", { neutral, happy, sad, surprised });
  }

  drawEmotions(happy, sad, fearful, neutral) {}
}
