import { Router } from "express";
import { asyncErrorHandler } from "../middleware/apiErrorHandler.js";
import { pageRolCtrl } from "../controllers/pageRole.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.get("/pages/:rolId",[ validateToken], asyncErrorHandler(pageRolCtrl.getPageRolId));

export default router;
