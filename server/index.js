const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./src/database/mongodb_connection");

const routes = require("./src/routes/index.js");
dotenv.config();

//Detect mode
const mode = process.env.NODE_ENV || "development";
const config = require("config").get(mode);

const PORT = process.env.PORT || config.port;
connectDb();
app.use(express.json({limit: '50mb'}));
app.use(
  cors({
    origin: [`http://localhost:3000`],
  })
);
console.log(config.port);
routes(app);
app.get("/", (req, res) => {
  res.send("RESTful called successfully!");
});
io.on("connection", (socket) => {
  socket.on("addUser", (userID) => {
    addUser(userID, socket.id);
    io.emit("getUser", roomMembers);
  });

  socket.on("sendMessage", ({ senderID, receiverID, text }) => {
    const user = getUser(receiverID);
    if (user) {
      io.to(user.socketID).emit("getMessage", {
        senderID,
        text,
      });
    }
  });

  socket.on("sendNotification", ({ senderID, receiverID, text }) => {
    const user = getUser(receiverID);
    if (user) {
      io.to(user.socketID).emit("getNotification", {
        senderID,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUser", roomMembers);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
