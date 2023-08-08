import { Router } from "express";
import {
  loginController,
  registerController,
  logoutController,
  profileController,
  refreshToken,
} from "../controllers/auth.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), loginController);
router.post("/register", validateSchema(registerSchema), registerController);
router.post("/logout", logoutController);


router.get("/profile", validateToken, profileController);
router.get("/refresh", refreshToken);

export default router;
