import { Router } from "express";
import {
  loginController,
  registerController,
  logoutController,
  refreshToken,
} from "../controllers/auth.controller.js";

import { validateSchema } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), loginController);
router.post("/register", validateSchema(registerSchema), registerController);
router.post("/logout", logoutController);



router.get("/refresh", refreshToken);

export default router;
