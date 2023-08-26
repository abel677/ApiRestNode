import { Router } from "express";
import { userCtrl } from "../controllers/user.controller.js";
import { asyncErrorHandler } from "../middleware/apiErrorHandler.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.get(
  "/user/:id",
  [validateToken],
  asyncErrorHandler(userCtrl.getUserById)
);

export default router;
