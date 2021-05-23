const { usersService } = require("../services");
const jwt = require("jsonwebtoken");

const logout = async (req, res, next) => {
  const { user } = req;

  try {
    await usersService.logout(user);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "logout success",
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usersService.getOne(email);

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET);
  await usersService.updateToken(user._id, token);
  const findedUser = await usersService.getOne(email);

  res.json({
    status: "success",
    code: 200,
    token,
    user: {
      email: findedUser.email,
      subscription: findedUser.subscription,
    },
  });
};
const signup = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersService.getOne(email);
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    await usersService.create(req.body);
    const newUser = await usersService.getOne(email);
    newUser
      ? res.status(201).json({
          status: "Created",
          code: 201,
          user: {
            email: email,
            subscription: newUser.subscription,
          },
        })
      : res.json({
          message: "Oooops! Something went wrong!",
        });
  } catch (error) {
    next(error);
  }
};
const current = async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({
    status: "ok",
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  logout,
  signup,
  login,
  current,
};
