const { contactsService } = require("../services");

const getAll = async (req, res, next) => {
  try {
    const results = await contactsService.getAll();
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
const update = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const result = await contactsService.update(id, body);
    res.json({
      status: "success",
      code: 200,
      data: {
        message: "contact was updated",
      },
    });
  } catch (error) {
    next(error);
  }
};
const patchContact = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await contactsService.patchContact(id, body);
    res.json({
      status: "success",
      code: 200,
      data: {
        message: "status was updated success",
      },
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await contactsService.create(body);
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
const deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await contactsService.deleteOne(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        message: "contact deleted",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  update,
  create,
  deleteOne,
  patchContact,
};
