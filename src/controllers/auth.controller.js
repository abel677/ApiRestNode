import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { createAccessToken, generateRefreshToken } from "../libs/jwt.js";
import { REFRESH_TOKEN } from "../config/config.js";

import { asyncErrorHandler } from "../middleware/apiErrorHandler.js";
import { ClientError, ClientResponse } from "../utils/responseApi.js";


export const loginController = asyncErrorHandler( async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    where: { email },
  });

  if (!userFound) throw new ClientError("Credenciales invalidas.", 400);

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) throw new ClientError("Credenciales invalidas.", 400);

  const { token } = await createAccessToken({
    id: userFound.id,
    name: userFound.username,
    email: userFound.email,
  });
  
  generateRefreshToken({ id: userFound.id, email: userFound.email }, res);

  res.status(200).json(ClientResponse(res, 200, { token }));
});


export const registerController = asyncErrorHandler( async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userFound = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (userFound)
      return res.status(404).json({ response: "El usuario ya existe." });
    
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });
    const userSave = await newUser.save();
    const token = await createAccessToken({ id: userSave.id });
    res.cookie("token", token);
    res.status(200).json({
      id: userSave.id,
      username: userSave.username,
      email: userSave.email,
      createdAt: userSave.createdAt,
      updatedAt: userSave.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
});


export const logoutController = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(),
  });
  res.sendStatus(200);
};


export const refreshToken = async (req, res) => {
  try {
    const expiresIn = 60 * 15;
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ response: "No exite el token " });
    const { id } = jwt.verify(token, REFRESH_TOKEN, { expiresIn });
    const newToken = await createAccessToken({ id });
    return res.json({ newToken, expiresIn });
  } catch (err) {
    res.status(500).json({ response: err });
    console.log(err);
  }
};


export const profileController = asyncErrorHandler(async (req, res) => {
  const userFound = await User.findOne({ where: { id: req.user.id } });
  if (!userFound) throw new ClientError("Credenciales invalidas.", 400);
  const user = {
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    state: userFound.state,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  };
  res.status(200).json(ClientResponse(res, 200, user));
});
