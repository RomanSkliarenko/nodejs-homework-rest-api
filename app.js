const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const contactsApi = require("./api");
const usersApi = require("./api/users");
const uploadApi = require("./api/upload");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname + "/public")));
app.use(cors());
app.use(express.json());
require("./configs/config-passport");

app.use("/contacts", contactsApi);
app.use("/users", usersApi);
app.use("/upload", uploadApi);

///обработка ошибок
app.use((req, res) => {
  res.status(400).json({
    status: "error",
    code: 404,
    message: "Page not found",
  });
});
app.use((error, req, res, next) => {
  const code = error.code || 500;
  res.status(500).json({
    status: "fail",
    code,
    message: error,
  });
});
//////////

const { PORT, DB_HOST } = process.env;
const port = PORT || 3000;
const dbConnect = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

dbConnect
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => console.log("Server is running"));
  })
  .catch((error) => console.log(error));
