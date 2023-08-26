import app from "./app.js";
import { PORT } from "./config/config.js";
import { sequelize } from "./utils/db.js";

const _PORT = PORT || 3000;

const main = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log(">> Base de datos conectada <<");
    app.listen(_PORT, () => {
      console.log(`>> Servidor corriendo en el puerto [${_PORT}] <<`);
    });
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

main();
