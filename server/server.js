const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");
const path = require("path");
const io = socket(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});
const PORT = 8000;
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use(cors());
app.use("*", express.static(path.join(__dirname, "../build")));
// app.get("*", (req, res) => {
//   express.static("../build");
// });
app.use("/peer", peerServer);
const users = {};
io.on("connection", (socket) => {
  socket.on("disconnecting", () => {
    console.log(socket.rooms);
  });
  socket.on("join-room", (roomid, userid) => {
    socket.join(roomid);
    socket.to(roomid).emit("user-connected", userid);
  });
  socket.on("disconnecting", () => {
    console.log("disconnecting", [...socket.rooms][1]);
    socket.to([...socket.rooms][1]).emit("user-disconnected", socket.id);
  });
  // socket.on("disconnect", () => {
  //   console.log("disconnected", socket.rooms);
  //   socket.to(socket.rooms[1]).emit("user-disconnected", socket.id);
  // });
});
server.listen(PORT, () => {
  console.log("http://localhost:8000");
});
