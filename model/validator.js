const { object, string } = require("yup");

const contactSchema = object({
  name: string().required("Обов`язкове поле"),
  email: string().required("Обов`язкове поле").email(),
  phone: string().required("Обов`язкове поле"),
});

module.exports = contactSchema;
