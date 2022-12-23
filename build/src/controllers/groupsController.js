"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroups = exports.getGroupById = exports.createGroup = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const GroupsService_1 = __importDefault(require("../services/GroupsService"));
async function createGroup(req, res) {
    try {
        let { name, description, picture, ownerID } = req.body;
        let groups = await GroupsService_1.default.createGroup(name, description, picture, ownerID);
        console.info(`SOMEONE CREATE A NEW GROUPS`);
        resAPI.success(res, groups);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.createGroup = createGroup;
async function getGroupById(req, res) {
    try {
        let { id } = req.params;
        let group = await GroupsService_1.default.getGroupById(id);
        console.info(`SOMEONE GET A GROUP ID ${id}`);
        resAPI.success(res, group);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getGroupById = getGroupById;
async function getAllGroups(req, res) {
    try {
        let groups = await GroupsService_1.default.getAllGroups();
        console.info(`SOMEONE GOT THE LIST OF GROUPS`);
        resAPI.success(res, groups);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllGroups = getAllGroups;
