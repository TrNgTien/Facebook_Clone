const express = require("express");
const app = express();
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
app.use(express.json());
app.use(cors({
  origin: [`http://localhost:${config.port}`, process.env.CLIENT_HOST]
}));
routes(app);
app.get("/", (req, res) => {
  res.send("RESTful called successfully!");
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
