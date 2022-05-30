let channel = new MessageChannel();
let track;

function sendPort() {
  let frame = document.getElementById("subframe");
  frame.contentWindow.postMessage({name:"port", port: channel.port2}, "http://localhost:8001", [channel.port2]);
};

async function startTrack() {
  const s = await navigator.mediaDevices.getDisplayMedia();
  
  document.getElementById("videoel").srcObject = new MediaStream([s.getVideoTracks()[0]]);
  document.getElementById("videoel").play();
  track = s.getVideoTracks()[0];
}

function transferTrack() {
  channel.port1.postMessage({name:"track", track}, [track]);
};

function sendMessage() {
  channel.port1.postMessage({name:"hi"});
};