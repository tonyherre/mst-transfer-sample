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
  const internalPath = "https://herre.users.x20web.corp.google.com/www/window-to-window-transfer/direct-imagebitmap-transfer";
  const githubPath = "https://tonyherre.github.io/mst-transfer-sample/direct-imagebitmap-transfer";
  const crossOriginUrl = (location.origin == "https://tonyherre.github.io" ? internalPath : githubPath) + "/reciever.html";
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
