import express from "express";
import morgan from "morgan";
import cors from "cors";

import cookieParser from "cookie-parser";
import { syncErrorHandler } from "./middleware/apiErrorHandler.js";
import { authRoute } from "./routes/index.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", authRoute);

app.use(syncErrorHandler);

export default app;
