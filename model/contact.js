const { Schema, model } = require("mongoose");
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Name must be exist!"],
  },
  email: {
    type: String,
    pattern: "^\\S+@\\S+\\.\\S+$",
    format: "email",
    minLength: 6,
    maxLength: 127,
    required: [true, "Email must be exist!"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone must be exist!"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);
module.exports = Contact;
