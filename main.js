let channel = new MessageChannel();
let track;

let sendPortBtn = document.getElementById("sendPort");
let startTrackBtn = document.getElementById("startTrack");
startTrackBtn.disabled = true;
let transferBtn = document.getElementById("transfer");
transferBtn.disabled = true;

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