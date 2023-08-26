import app from "./app.js";
import { PORT } from "./config/config.js";
import { sequelize } from "./utils/db.js";

const main = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log(">> Base de datos conectada <<");
    app.listen(PORT, () => {
      console.log(`>> Servidor corriendo en el puerto [${PORT}] <<`);
    });
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

main();
