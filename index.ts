import app from "./src/app";
import env from "./src/utils/env";
import { sequelize } from "./src/database/database";

import "./src/models/User";
import "./src/models/Roles";
import migrations from "./src/migrations";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    migrations();
    console.info("Se ha conectado correctamente a la base de datos.");
    app.listen(env.api.port);
    console.info(
      `Se ha iniciado la API correctamente en el puerto ${env.api.port}`
    );
  } catch (error) {
    console.error(error);
    console.error("No se pudo conectar a la base de datos.");
  }
})();
