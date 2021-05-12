const { Schema, model } = require("mongoose");
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Name must be exist!"],
  },
  email: {
    type: String,
    required: [true, "Email must be exist!"],
  },
  phone: {
    type: Number,
    required: [true, "Phone must be exist!"],
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
    match: /^[A-Z]{3}[1-9]{3}$/g,
  },
});

const Contact = model("contact", contactSchema);
module.exports = Contact;
