import { Router } from "express";
import { autCtrl } from "../controllers/auth.controller.js";

import { validateSchema } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { asyncErrorHandler } from "../middleware/apiErrorHandler.js";

const router = Router();

router.post(
  "/auth/register",
  validateSchema(registerSchema),
  asyncErrorHandler(autCtrl.registerCtrl)
);

router.post(
  "/auth/login",
  validateSchema(loginSchema),
  asyncErrorHandler(autCtrl.loginCtrl)
);

router.get("/auth/confirm/:token", asyncErrorHandler(autCtrl.confirmCtrl));
router.post("/auth/logout", autCtrl.logoutCtrl);
router.get("/refresh", autCtrl.refreshToken);

export default router;
