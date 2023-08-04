const path = require("path");
const fs = require("fs/promises");
const { ctrlrWrapper } = require("../../decorators");
const { User } = require("../../models/user");
const { HttpError, avatarHandler } = require("../../helpers");

const successStatus = 200;
const errStatus = 401;

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  avatarHandler(tempUpload);

  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);

  const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  if (!user) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json({ avatarURL: user.avatarURL });
};

module.exports = { updateAvatar: ctrlrWrapper(updateAvatar) };
