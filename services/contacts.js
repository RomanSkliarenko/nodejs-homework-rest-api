const { Contact } = require("../model");

const getAll = (query) => {
  return Contact.find(query);
};

const getOne = (id) => {
  return Contact.findOne({ _id: id });
};

const add = (newContact) => {
  return Contact.create(newContact);
};

module.exports = {
  add,
  getAll,
  getOne,
};
