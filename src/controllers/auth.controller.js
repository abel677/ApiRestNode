import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import { createAccessToken, generateRefreshToken } from "../libs/jwt.js";
import { REFRESH_TOKEN } from "../config/config.js";

import { userServices } from "../services/userServices.js";
import { ClientError } from "../utils/responseApi.js";
import { handleBcrypt } from "../helpers/handleBcrypt.js";
import { User } from "../models/user.model.js";
import { UserRole } from "../models/userRole.js";
import { Rol } from "../models/roles.model.js";
import { mailer } from "../helpers/mailer.js";

const registerCtrl = async (req, res) => {
  const { username, email, password } = req.body;
  const { rolId } = req.body;

  const user = await userServices.getUserEmail(email);
  if (user) throw new ClientError("Usuario ya existe", 401);

  const passwordHash = await handleBcrypt.encrypt(password);
  const roles = await Rol.findAll({
    where: {
      id: rolId,
    },
  });
  if (roles.length === 0) throw new ClientError("Servicio no activo", 400);

  const newUser = await User.create({
    username,
    email,
    password: passwordHash,
  });

  roles.forEach(async (rol) => {
    const relation = await UserRole.create({
      userId: newUser.id,
      rolId: rol.id,
    });
  });

  const { token } = await createAccessToken({ id: newUser.id });
  newUser.update({ ...newUser, confirmToken: token });

  //generateRefreshToken({ id: newUser.id, email: newUser.email }, res);

  mailer.sendEmail(email, username, token);

  return res
    .status(200)
    .json({ error: false, status: 200, message: "Usuario registrado" });
};

const confirmCtrl = async (req, res) => {
  const { token } = req.params;
  const user = await userServices.getUserToken(token);

  if(!user) throw new ClientError("Sesión expirada",401)

  if (user.confirmAccount)
    return res.json({
      error: false,
      status: 200,
      message: "La cuenta ya está confirmada",
    });

  user.update({ ...user, confirmAccount: true, confirmToken: null });

  return res.json({ error: false, status: 200, message: "Cuenta confirmada" });
};

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.getUserEmail(email);
  if (!user) throw new ClientError("Credenciales invalidas.", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ClientError("Credenciales invalidas.", 400);

  if (!user.confirmAccount)
    throw new ClientError("La cuenta no está confirmada", 400);

  const { token } = await createAccessToken({ id: user.id });
  generateRefreshToken({ id: user.id, email: user.email }, res);

  return res.json({ error: false, status: 200, token: token });
};

const logoutCtrl = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(),
  });
  res.sendStatus(200);
};



const refreshToken = async (req, res) => {
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

export const autCtrl = {
  registerCtrl,
  confirmCtrl,
  loginCtrl,
  logoutCtrl,
  refreshToken,
};
