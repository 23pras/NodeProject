const EventEmitter = require("events"); // module use to create emitter
const http = require("http"); // module use to create http server

// EventEmitter is the class from module events

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

// these are the events observer

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("customer name: Prashant");
});

myEmitter.on("newSale", (stock) => {
  console.log(`this is the num ${stock} left in the stock`);
});

// this is the object thaT emits events

myEmitter.emit("newSale", 92);

/////////////////////////////////////////////////////

const server = http.createServer();

// here we are listening to request object that server will emit

server.on("request", (req, res) => {
  console.log("1 request received");
  res.end("2 request received");
});

server.on("request", (req, res) => {
  console.log("another request received");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for request...");
});
