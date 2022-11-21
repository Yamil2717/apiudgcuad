"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../models/Roles");
console.log(module);
async function up({ context: Roles }) {
    await Roles;
}
async function down({ context: Roles }) {
    await Roles.dropTable('users');
}
module.exports = { up, down };
