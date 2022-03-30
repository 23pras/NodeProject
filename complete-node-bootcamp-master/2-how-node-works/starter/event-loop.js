const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2; // this sets the number of threads to run

setTimeout(() => console.log("timer 1 finsihed"), 0);
setImmediate(() => console.log("imd 1 finsihed"));

fs.readFile("./test-file.txt", () => {
  console.log("I/O finsihed");
  console.log("-----------------------");
  setTimeout(() => console.log("timer 2 finsihed"), 0);
  setTimeout(() => console.log("timer 3 finsihed"), 3000);
  setImmediate(() => console.log("imd 2 finsihed"));

  process.nextTick(() => console.log("Process.next-tick"));

  // 4 thread pool running together

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the top-level code");
