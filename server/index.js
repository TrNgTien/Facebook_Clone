const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
const routes = require("./routes/index.js");
dotenv.config();
app.use(express.json());
app.use(cors());
routes(app);
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
