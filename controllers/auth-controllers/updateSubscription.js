const { ctrlrWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const successStatus = 200;
const errStatus = 404;

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    {
      subscription: subscription,
    },
    { new: true }
  );

  if (!user) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json(user);
};

module.exports = { updateSubscription: ctrlrWrapper(updateSubscription) };
