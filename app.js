const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const { Contact } = require("./model");
const contactsApi = require("./api");

const app = express();
app.use(cors());
app.use("/contacts", contactsApi);
// app.post("/contacts", express.json(), async (req, res, next) => {
//   try {
//     const newContact = new Contact(req.body);
//     const result = await newContact.save();
//     res.json({
//       status: "success",
//       code: 201,
//       data: { result },
//     });
//   } catch (error) {
//     next(error);
//   }
// });
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
    message: error.message,
  });
});
//////////////////

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
    console.log("DB connect");
    app.listen(port, () => console.log("Server is running"));
  })
  .catch((error) => console.log(error));
