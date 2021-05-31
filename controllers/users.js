const { usersService } = require("../services");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
const sgMail = require("../sendgrid/sendgrid");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const getUserVerifi = await usersService.getUserVerifi(verificationToken);
  await usersService.updateVerifyToken(getUserVerifi._id);
  await usersService.updateVerify(getUserVerifi._id);

  getUserVerifi
    ? res.status(200).json({
        status: "ok",
        code: 200,
        ResponseBody: {
          message: "Verification successful",
        },
      })
    : res.status(404).json({
        status: "Not Found",
        code: 404,
        ResponseBody: {
          message: "User not found",
        },
      });
};
const repeatVerify = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      status: "Error",
      code: 400,
      ResponseBody: {
        message: "missing required field email",
      },
    });
  }
  const user = await usersService.getOne(email);
  if (user && !user.verify && user.verifyToken) {
    //отправляем письмо
    const veifyMessage = {
      to: email,
      from: "vurtnevk@gmail.com",
      subject: "Verify your email",
      text: "To verify your email follow this link",
      html: `<a>http://localhost:3000/users/verify/${user.verifyToken}</a>`,
    };
    await sgMail
      .send(veifyMessage)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    /////////////
    res.status(200).json({
      status: "ok",
      ResponseBody: {
        message: "Verification email sent",
      },
    });
  }
  if (user && user.verify) {
    res.status(400).json({
      status: "Bad Request",
      ResponseBody: {
        message: "Verification has already been passed",
      },
    });
  }
};
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

  if (!user.verify) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Your email is not verifyed yet",
      data: "Please verify your email",
    });
  }

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
    const veifyMessage = {
      to: newUser.email,
      from: "vurtnevk@gmail.com",
      subject: "Verify your email",
      text: "To verify your email follow this link",
      html: `<a>http://localhost:3000/users/verify/${newUser.verifyToken}</a>`,
    };
    await sgMail
      .send(veifyMessage)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
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
const avatars = async (req, res, next) => {
  const now = new Date();
  const prefix = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
  const { path: temporaryName, originalname } = req.file;
  const { user, file } = req;
  const avatarsDir = path.join(process.cwd(), "public", "avatars");
  const filePathName = path.join(avatarsDir, `${prefix}_${originalname}`);
  const img = await Jimp.read(temporaryName);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(temporaryName);
  await fs.rename(temporaryName, filePathName, (err) => {
    if (err) {
      console.log(err);
    }
  });

  await usersService.updateAvatar(user._id, filePathName);
  const userWithUpdtAvatar = await usersService.getOne(user.email);
  return res.status(200).json({
    status: "ok",
    code: 200,
    user: {
      avatarURL: userWithUpdtAvatar.avatarURL,
    },
  });
};

module.exports = {
  logout,
  signup,
  login,
  current,
  avatars,
  verify,
  repeatVerify,
};
