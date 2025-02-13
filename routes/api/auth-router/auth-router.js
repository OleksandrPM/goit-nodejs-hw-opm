const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerifyEmail,
} = require("../../../controllers/auth-controllers");
const { validateBody } = require("../../../decorators");
const {
  userSignupSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../../schemas/users-schemas");

const { authenticate, upload } = require("../../../middlewares");

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), registerUser);

authRouter.get("/verify/:verificationToken", verifyUser);

const bedRequestBodyMsg = "missing required field email";
authRouter.post(
  "/verify",
  validateBody(verifyEmailSchema, bedRequestBodyMsg),
  resendVerifyEmail
);

authRouter.post("/login", validateBody(userLoginSchema), loginUser);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateAvatar
);

module.exports = authRouter;
