import { Rol } from "./models/roles.model.js";
import { sequelize } from "./utils/db.js";

const roles = [{ rol: "admin" }, { rol: "patient" }, { rol: "doctor" }];

async function seed() {
  try {
    await sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
    .then(function(results) {
        sequelize.sync({force: true});
    });
    await sequelize.sync({ force: true }).then(() => {
      roles.forEach(async (rol) => {
        await Rol.create(rol);
      });
    });
  } catch (error) {
    console.log(`Error ${error}`);
  }
}
seed();
