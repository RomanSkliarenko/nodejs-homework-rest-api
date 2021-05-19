const { Contact } = require("../model");

const getAll = () => {
  return Contact.find();
};
const getOne = (id) => {
  return Contact.findOne({ _id: id });
};
const update = (id, body) => {
  return Contact.updateOne({ _id: id }, body, { upsert: true });
};
const patchContact = (id, body) => {
  const { favorite } = body;
  return favorite || favorite === false
    ? Contact.updateOne({ _id: id }, { $set: { favorite } })
    : { message: "missing field favorite" };
};
const create = (body) => {
  const { favorite } = body;
  const newContactWithStatus = {
    ...body,
    favorite: favorite ? favorite : false,
  };
  const newContact = new Contact(newContactWithStatus);
  return newContact.save();
};
const deleteOne = (id) => {
  return Contact.findByIdAndRemove(id);
};

module.exports = {
  deleteOne,
  patchContact,
  getAll,
  getOne,
  update,
  create,
};
