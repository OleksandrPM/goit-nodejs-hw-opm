const Jimp = require("jimp");

const avatarWidth = 250;
const avatarHeight = 250;

const avatarHandler = async (imgPath) => {
  const avaImg = await Jimp.read(imgPath);
  await avaImg.resize(avatarWidth, avatarHeight).write(imgPath);
};

module.exports = avatarHandler;
