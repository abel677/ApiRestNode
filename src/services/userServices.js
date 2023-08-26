import { User } from "../models/user.model.js";

const getUserEmail = async (email) => {
  const user = await User.findOne({ where: { email }});
  return user;
};
const getUserToken = async (token) => {
  const user = await User.findOne({ where: { confirmToken: token }});
  return user;
};

export const userServices = { getUserEmail, getUserToken };
