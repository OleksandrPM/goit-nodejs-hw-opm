const { Schema, model } = require("mongoose");
const { handleErrorSave, handleUpdateValidate } = require("../hooks");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

contactSchema.post("save", handleErrorSave);
contactSchema.post("findOneAndUpdate", handleErrorSave);

const Contact = model("Contact", contactSchema);

module.exports = { Contact };
