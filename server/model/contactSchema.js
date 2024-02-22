const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

// create a model or collection from the schema
const Contact = new model("Contact", contactSchema);
module.exports = Contact;
