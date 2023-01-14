"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const env_1 = __importDefault(require("./src/utils/env"));
const database_1 = require("./src/database/database");
require("./src/models/User");
require("./src/models/Roles");
require("./src/models/Groups");
require("./src/models/Comments");
require("./src/models/Publications");
require("./src/models/Interest");
require("./src/models/Tag");
require("./src/models/Reactions");
require("./src/models/ReactionsComments");
require("./src/models/Notifications");
require("./src/models/Requests");
const migrations_1 = __importDefault(require("./src/migrations"));
(async () => {
    try {
        await database_1.sequelize
            .sync({ alter: true, logging: false })
            .then(() => (0, migrations_1.default)());
        console.info("Se ha conectado correctamente a la base de datos.");
        app_1.default.listen(env_1.default.api.port);
        console.info(`Se ha iniciado la API correctamente en el puerto ${env_1.default.api.port}`);
    }
    catch (error) {
        console.error(error);
        console.error("No se pudo conectar a la base de datos.");
    }
})();
