const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { ctrlrWrapper } = require("../../decorators");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const successStatus = 200;
const errStatus = 401;

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  const avaImg = await Jimp.read(tempUpload);
  await avaImg.resize(250, 250).write(tempUpload);

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  if (!user) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json({ avatarURL: user.avatarURL });
};

module.exports = { updateAvatar: ctrlrWrapper(updateAvatar) };
