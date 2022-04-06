const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
  // solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });
  // solution 2 : streams
  //   const readable = fs.createReadStream("test-file.txt");
  //   // here we are writing the data in chunk, means whatever we received we sent it to client
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   // as soon as the file gets read and write, in the end with have end with res.end
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   // this is for error handling
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("file not found");
  //   });

  // SOLUTION 3

  const readable = fs.createReadStream("test-file.txt");

  readable.pipe(res);

  // readableSource.pipe(writeabledestination);
});

server.listen(8000, "127.0.0.1", () => console.log("listening ...."));
