const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);
dotenv.config();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with Id: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_mess", data =>{
    console.log("send mess",data)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
