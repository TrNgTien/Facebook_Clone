const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mode = process.env.NODE_ENV || "development";
const config = require("config").get(mode);
const connectDb = require("./src/database/mongodb_connection");

const routes = require("./src/routes/index.js");

connectDb();
dotenv.config();
app.use(express.json());
app.use(cors());
routes(app);

const PORT = process.env.PORT_ENV || config.port;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
