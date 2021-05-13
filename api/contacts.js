const express = require("express");

const { contactsCtrl } = require("../controllers");
const router = express.Router();

router.get("/", contactsCtrl.getAll);

router.get("/:id", contactsCtrl.getOne);

router.post("/", express.json(), contactsCtrl.create);

router.put("/:id", express.json(), contactsCtrl.update);

router.patch("/:id/favorite", express.json(), contactsCtrl.patchContact);

router.delete("/:id", contactsCtrl.deleteOne);

module.exports = router;
