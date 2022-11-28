"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroups = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const GroupsService_1 = __importDefault(require("../services/GroupsService"));
async function getAllGroups(req, res) {
    try {
        let groups = await GroupsService_1.default.getAllGroups();
        console.info(`SOMEONE GOT THE LIST OF GROUPS`);
        resAPI.success(res, { message: 'Ha obtenido la lista de grupos de forma correcta.', ...groups });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllGroups = getAllGroups;
