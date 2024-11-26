const path = require("path");
const { readFileSync } = require("fs");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");
const handleConnection = require("./routes/videoPlayerRoutes");

const PORT = 8000;
const app = express();
const JSONParser = express.json({ limit: "100mb" });
const endPoints = ["/video"];

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/static", express.static(path.join(__dirname, "files")));
app.use(endPoints, cors({ origin: "*" }), JSONParser);
app.options(endPoints, cors({ origin: "*" }), (req, res, next) => {
  res.set("Access-Control-Allow-Private-Network", "true");
  next();
});

io.on("connection", (socket) => handleConnection(socket, io));

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`app is up on ${PORT}`);
});
