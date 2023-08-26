import { Rol } from "../models/rol.model.js";
import { User } from "../models/user.model.js";

const getUserEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
const getUserToken = async (token) => {
  const user = await User.findOne({ where: { confirmToken: token } });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
    attributes: ["id", "username", "email", "state","createdAt","updatedAt"],
    include: [{ model: Rol, attributes: ["id", "rol"] }],
  });
  return user;
};

export const userServices = { getUserEmail, getUserToken, getUserById };
