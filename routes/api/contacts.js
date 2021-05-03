const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    result
      ? res.json({
          status: "success",
          code: 200,
          data: {
            result,
          },
        })
      : res.json({
          status: "error",
          code: 404,
          data: {
            message: "Not found",
          },
        });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const invalid = {
    message: "invalid data in one of the input fields",
  };
  const missingFields = {
    message: "missing required name field",
  };
  try {
    const { body } = req;
    let result = null;
    body.name && body.phone && body.email
      ? (result = await addContact(body))
      : res.json({
          data: {
            message: missingFields,
          },
        });
    if (result.contact && result.isValid) {
      return res.json({
        status: "success",
        code: 201,
        data: {
          result: result.contact,
        },
      });
    } else if (result.contact && !result.isValid) {
      return res.json({
        data: {
          invalid,
        },
      });
    } else {
      res.json({
        data: {
          message: "Oooops, something went wrong",
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    result
      ? res.json({
          status: "success",
          code: 200,
          data: {
            message: "contact deleted",
          },
        })
      : res.json({
          status: "success",
          code: 404,
          data: {
            message: "Not found",
          },
        });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    console.log(body);
    body.name || body.email || body.phone
      ? (result = await updateContact(contactId, body))
      : { message: "missing fields" };
    return res.json({
      status: result ? "success" : "error",
      code: result ? 200 : 400,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
