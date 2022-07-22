const faceapi = require("face-api.js");
const uri = "https://tmpr.s3.eu-central-1.amazonaws.com/ml/faceapi-models/";

export function loadFaceModels() {
  return new Promise((resolve) => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(uri),
      faceapi.nets.faceLandmark68Net.loadFromUri(uri),
      faceapi.nets.faceRecognitionNet.loadFromUri(uri),
      faceapi.nets.faceExpressionNet.loadFromUri(uri)
    ]).then((data) => {
      resolve();
    });
  });
}
