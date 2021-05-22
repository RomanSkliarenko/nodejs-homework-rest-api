const express = require("express");
const auth = require("../configs/authorization");

const { contactsCtrl } = require("../controllers");
const router = express.Router();

router.get("/", auth, contactsCtrl.getAll);

router.get("/:id", auth, contactsCtrl.getOne);

router.post("/", express.json(), contactsCtrl.create);

router.put("/:id", express.json(), contactsCtrl.update);

router.patch("/:id/favorite", express.json(), contactsCtrl.patchContact);

router.delete("/:id", contactsCtrl.deleteOne);

module.exports = router;
