"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Groups_1 = require("../models/Groups");
class groupsService {
    async createGroup(name, description, picture, ownerID) {
        let group = await Groups_1.Groups.create({
            name,
            description,
            picture,
            membersIDS: [ownerID],
            idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
        });
        return group;
    }
    async getGroupById(id) {
        let group = await Groups_1.Groups.findOne({ where: { id } });
        return group?.get();
    }
    async getAllGroups() {
        let groups = await Groups_1.Groups.findAll();
        let groupsData = [];
        groups.map((group) => {
            groupsData.push(group.get());
        });
        if (groupsData.length <= 0)
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de grupo registrado.");
        return groupsData;
    }
}
let GroupsService = new groupsService();
exports.default = GroupsService;
