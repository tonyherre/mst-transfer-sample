
let forwardingWorker = new SharedWorker("shared-worker.js");
forwardingWorker.onerror = (m) => console.log("Worker error ", m);

onload = () => {
  window.statusMsg = document.getElementById("status");
  statusMsg.innerText = "Connected to worker";
};

let track;

forwardingWorker.port.onmessage = async (m) => {
  console.log("Got message from worker: ", m);

  switch (m.data.name) {
  case "port":
    window.port = m.data.port;
    window.port.onmessage = messagePortOnMessage;
    statusMsg.innerText = "Received message port";
    break;
  }
}

async function messagePortOnMessage(m) {
  console.log("Transferred port got message:", m);

  if (m.data.name == "track") {
    statusMsg.innerText = "Received transferred track. Waiting to initialize...";
    track = m.data.track;
  
    let start = performance.now();
    await track.applyConstraints();
    console.log("Waited for " + (performance.now() - start) + "ms");
    let video = document.getElementById("videoel");
    video.srcObject = new MediaStream([track]);
    video.play();
    statusMsg.innerText = "Transferred track playing!";
  }
}