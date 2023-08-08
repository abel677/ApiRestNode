import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import { profileController } from "../controllers/auth.controller.js";


const router = Router()

router.get("/profile", validateToken, profileController);

export default router