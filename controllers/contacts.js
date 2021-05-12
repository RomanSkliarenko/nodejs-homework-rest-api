const { contactsService } = require("../services");

const getAll = async (req, res, next) => {
  const { query } = req;
  try {
    const results = await contactsService.getAll(query);
    res.json({
      status: "success",
      code: 200,
      data: {
        results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await contactsService.getOne(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await contactsService.add(body);
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  getAll,
  getOne,
};
