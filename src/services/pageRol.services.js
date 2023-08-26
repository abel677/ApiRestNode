import { Page } from "../models/page.js";
import { PageRol } from "../models/pageRole.js";
import { Rol } from "../models/rol.model.js";

const getPageRolId = async (rolId) => {
  const pages = await Rol.findAll({
    where: { id: rolId },
    include: [{ model: Page }],
  });

  return pages;
};

export const pageRolServices = { getPageRolId };
