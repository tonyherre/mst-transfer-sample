let ports = [];

onconnect = function(e) {
  var port = e.ports[0];
  console.log("onconnect with port ", port);

  ports.push(port);
  port.onmessage = (m) => {
    console.log("Got message ", m, " from port ", port);

    if (m.data.name == "port") {
      ports.forEach(p => {
        if(p != port) {
          console.log("Forwarding to port ", p);
          p.postMessage({name: "port", port: m.data.port}, [m.data.port]);
        }
      });
    }
  };
}