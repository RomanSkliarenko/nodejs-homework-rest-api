const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const MongoClient = require("mongodb");

// new MongoClient(
//   "mongodb+srv://node-db-goit:51742344rR@cluster0.pk3id.mongodb.net/db-contacts?retryWrites=true&w=majority",
//   {
//     useUnifiedTopology: true,
//   }
// ).connect((err, database) => {
//   if (err) {
//     return;
//   }
//   const port = PORT || 3000;
//   app.listen(port);
// });

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;