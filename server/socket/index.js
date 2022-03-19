const dotenv = require("dotenv");
dotenv.config();

//Detect mode
const mode = process.env.NODE_ENV || "development";
const config = require("config").get(mode);

const PORT = process.env.PORT || config.port;
const io = require("socket.io")(PORT, {
  cors: {
    origin: [`http://localhost:3000`, process.env.CLIENT_HOST],
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNoti", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
