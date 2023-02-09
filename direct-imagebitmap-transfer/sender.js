const videoEl = document.getElementsByTagName("video")[0];
const sameOriginButton = document.getElementById("sameOriginButton");
const crossOriginButton = document.getElementById("crossOriginButton");


onload = async () => {
  window.streamPromise = navigator.mediaDevices.getUserMedia({video:true});
  videoEl.srcObject = await streamPromise;
};

sameOriginButton.onclick = async () => {
  openReceiver("receiver.html");
};
crossOriginButton.onclick = async () => {
  const crossOriginUrl = (location.origin == "https://tonyherre.github.io" ? "https://x20web.corp.google.com/users/he/herre/www/cross-window-media-transfer/receiver.html" : "https://tonyherre.github.io/mst-transfer-sample/direct-imagebitmap-transfer/receiver.html");
  openReceiver(crossOriginUrl);
};

function openReceiver(url) {
  const child = window.open(url, '_blank', "width=800px,height=500px");
  onmessage = () => sendBitmap(child);
}

async function sendBitmap(messagePort) {
  await streamPromise;
  try {
    const imageBitmap = await createImageBitmap(videoEl);
    messagePort.postMessage({image: imageBitmap}, "*", [imageBitmap]);
  } catch (e) {
    console.log("Failed to send image", e);
  }

  setTimeout(() => sendBitmap(messagePort), 0);
}
