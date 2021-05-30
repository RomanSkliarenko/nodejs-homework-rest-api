const { User } = require("../model");

const logout = (user) => {
  return User.findByIdAndUpdate(user._id, { token: null }, { new: true });
};
const getOne = (email) => {
  return User.findOne({ email });
};
const getUserVerifi = (verifyToken) => {
  return User.findOne({ verifyToken });
};
const updateToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token }, { new: true });
};
const updateAvatar = (id, avatarURL) => {
  return User.findByIdAndUpdate(id, { avatarURL }, { new: true });
};
const create = async (body) => {
  const { login, email, password } = body;
  const newUser = new User({ login, email });
  await newUser.setPassword(password);
  await newUser.save();
};
const updateVerifyToken = (id) => {
  return User.findByIdAndUpdate(id, { verifyToken: null }, { new: true });
};
const updateVerify = (id) => {
  return User.findByIdAndUpdate(id, { verify: true }, { new: true });
};

module.exports = {
  logout,
  getOne,
  updateToken,
  create,
  updateAvatar,
  getUserVerifi,
  updateVerifyToken,
  updateVerify,
};
