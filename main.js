let channel = new MessageChannel();
let track;

let sendPortBtn = document.getElementById("sendPort");
let startTrackBtn = document.getElementById("startTrack");
startTrackBtn.disabled = true;
let transferBtn = document.getElementById("transfer");
transferBtn.disabled = true;


function isTrackTransferSupported() {
  let track = document.createElement("canvas").captureStream().getTracks()[0];
  let port = new MessageChannel().port1;
  try {
    port.postMessage({},[track]);
  } catch(e) {
    console.log("Transfer support check failed: ", e);
    return false;
  }
  return true;
}

onload = () => {
  if (!isTrackTransferSupported()) {
    sendPortBtn.disabled = true;
    window.statusMsg = document.getElementById("status");
    statusMsg.innerText = "MediaStreamTrack Transfer is not supported by this browser.";
  }
};


function sendPort() {
  sendPortBtn.disabled = true;
  let frame = document.getElementById("subframe");
  frame.contentWindow.postMessage({name:"port", port: channel.port2}, "http://localhost:8001", [channel.port2]);
  startTrackBtn.disabled = false;
};

async function startTrack() {
  startTrackBtn.disabled = true;
  const s = await navigator.mediaDevices.getDisplayMedia();
  
  document.getElementById("videoel").srcObject = new MediaStream([s.getVideoTracks()[0]]);
  document.getElementById("videoel").play();
  track = s.getVideoTracks()[0];
  transferBtn.disabled = false;
}

function transferTrack() {
  channel.port1.postMessage({name:"track", track}, [track]);
};