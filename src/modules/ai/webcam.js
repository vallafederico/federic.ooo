export function getWebcam() {
  return new Promise((resolve) => {
    var video = document.querySelector("[data-ai='video']");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.onloadedmetadata = () => resolve(video);
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  });
}
