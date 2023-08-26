import { userServices } from "../services/userServices.js";

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);
  return res.json(user);
};

export const userCtrl = { getUserById };
