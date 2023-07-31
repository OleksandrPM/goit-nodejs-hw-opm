const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
} = require("../../../controllers/auth-controllers");
const { validateBody } = require("../../../decorators");
const {
  userSignupSchema,
  userLoginSchema,
  updateSubscriptionSchema,
} = require("../../../schemas/users-schemas");

const { authenticate } = require("../../../middlewares");

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), registerUser);

authRouter.post("/login", validateBody(userLoginSchema), loginUser);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

module.exports = authRouter;
