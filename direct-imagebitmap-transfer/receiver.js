const canvasEl = document.getElementsByTagName("canvas")[0];
const context = canvasEl.getContext("2d");


window.onmessage = async (event) => {
  canvasEl.width = event.data.image.width;
  canvasEl.height = event.data.image.height;
  context.drawImage(event.data.image, 0, 0);
};

window.opener.postMessage("Hi", "*");