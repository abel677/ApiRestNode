import { pageRolServices } from "../services/pageRol.services.js";

const getPageRolId = async (req, res) => {
  const { rolId } = req.params;
  const pages = await pageRolServices.getPageRolId(rolId);
  return res.json(pages);
};

export const pageRolCtrl = { getPageRolId }