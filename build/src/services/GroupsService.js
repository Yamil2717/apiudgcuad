"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Groups_1 = require("../models/Groups");
class groupsService {
    async getAllGroups() {
        let groups = await Groups_1.Groups.findAll();
        if (groups.length <= 0)
            throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de grupo registrado.');
        return { data: groups };
    }
}
let GroupsService = new groupsService;
exports.default = GroupsService;
