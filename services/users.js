const { User } = require("../model");

const logout = (user) => {
  return User.findByIdAndUpdate(user._id, { token: null }, { new: true });
};
const getOne = (email) => {
  return User.findOne({ email });
};
const updateToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token }, { new: true });
};
const create = async (body) => {
  const { login, email, password } = body;
  const newUser = new User({ login, email });
  await newUser.setPassword(password);
  await newUser.save();
};

module.exports = {
  logout,
  getOne,
  updateToken,
  create,
};
