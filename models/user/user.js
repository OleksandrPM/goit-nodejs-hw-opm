const { Schema, model } = require("mongoose");
const { handleUpdateValidate, handleErrorSave } = require("../hooks");
const { emailRegexp, subscriptionValues } = require("../../constants");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionValues,
    default: subscriptionValues[0],
  },
  token: { type: String },
  avatarURL: { type: String },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    // required: [true, "Verify token is required"],
  },
});

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleErrorSave);
userSchema.post("findOneAndUpdate", handleErrorSave);

const User = model("user", userSchema);

module.exports = { User };
