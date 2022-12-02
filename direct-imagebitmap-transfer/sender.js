const videoEl = document.getElementsByTagName("video")[0];
const sameOriginButton = document.getElementById("sameOriginButton");
const crossOriginButton = document.getElementById("crossOriginButton");


onload = async () => {
  window.streamPromise = navigator.mediaDevices.getUserMedia({video:true});
  videoEl.srcObject = await streamPromise;
};

sameOriginButton.onclick = async () => {
  const child = window.open("receiver.html");
  onmessage = () => sendBitmap(child);
};
crossOriginButton.onclick = async () => {
  const child = window.open("https://tonyherre.github.io/mst-transfer-sample/direct-imagebitmap-transfer/receiver.html");
  onmessage = () => sendBitmap(child);
};

async function sendBitmap(messagePort) {
  await streamPromise;
  const imageBitmap = await createImageBitmap(videoEl);
  messagePort.postMessage({image: imageBitmap}, "*", [imageBitmap]);

  setTimeout(() => sendBitmap(messagePort), 0);
}
