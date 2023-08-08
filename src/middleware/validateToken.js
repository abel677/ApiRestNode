import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
import { ClientError } from "../utils/responseApi.js";

export const validateToken = (req, res, next) => {
  const bearerHeader = req.headers?.authorization;

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, TOKEN_SECRET, (err, decode) => {
      if (err) throw new ClientError("Token invalalido.", 401);
      req.user = decode;
    });
    next();
  } else {
    throw new ClientError("No autorizado.", 401);
  }
};

