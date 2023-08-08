import jwt from "jsonwebtoken";
import { REFRESH_TOKEN, MODE, TOKEN_SECRET } from "../config/config.js";

const expiresIn = 600 * 15;

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn }, (err, token) => {
      if (err) reject(err);
      resolve({ token, expiresIn });
    });
  });
}

export const generateRefreshToken = (payload, res) => {
  try {
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(MODE === "DEVELOPER"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};
