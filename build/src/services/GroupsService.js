"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Groups_1 = require("../models/Groups");
const env_1 = __importDefault(require("../utils/env"));
const UserServices_1 = __importDefault(require("./UserServices"));
class groupsService {
    async createGroup(name, description, picture, ownerID) {
        let group = await Groups_1.Groups.create({
            name,
            description,
            picture,
            membersIDS: [ownerID],
            membersCount: 1,
            ownerID,
            header: `${env_1.default.api.urlAPI}/images/group_banner/default.jpeg`,
        });
        return group;
    }
    async getGroupById(id) {
        let group = await Groups_1.Groups.findOne({ where: { id } });
        return group.get();
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
    async getAllMyGroups(userID) {
        let user = await UserServices_1.default.userGetById(userID);
        let { groups } = user;
        let groupsIDs = [];
        Object.keys(groups).map((key) => {
            groupsIDs.push({ id: key });
        });
        let groupsData = await Groups_1.Groups.findAll({
            attributes: {
                exclude: ["membersIDS"],
            },
            where: {
                [sequelize_1.Op.or]: groupsIDs,
            },
        });
        let groupsDataReturn = [];
        groupsData.map((group) => {
            groupsDataReturn.push(group.get());
        });
        return groupsDataReturn;
    }
    async groupUpdatePicture(url, groupID, ownerID) {
        let group = await Groups_1.Groups.update({
            picture: url,
        }, {
            where: { id: groupID, ownerID },
            returning: true,
        });
        if (group[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async groupUpdateHeader(url, groupID, ownerID) {
        let group = await Groups_1.Groups.update({
            header: url,
        }, {
            where: { id: groupID, ownerID },
            returning: true,
        });
        if (group[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async groupUpdateMembers(id, idUser, value) {
        let group = await Groups_1.Groups.findOne({ where: { id } });
        let { membersCount, membersIDS } = group.get();
        let newMembersIDS = [...membersIDS];
        newMembersIDS.push(idUser);
        let newMembersCount = membersCount;
        if (value > 0) {
            newMembersCount += value;
        }
        else {
            newMembersCount -= value;
        }
        let groupUpdate = await Groups_1.Groups.update({
            membersCount: newMembersCount,
            membersIDS: newMembersIDS,
        }, { where: { id } });
        if (groupUpdate[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async searchGroupsByPartialName(partialName) {
        let lookupValue = partialName.toLowerCase();
        let groups = await Groups_1.Groups.findAll({
            limit: 10,
            where: {
                name: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("name")), "LIKE", "%" + lookupValue + "%"),
            },
        });
        let tempGroupsFind = [];
        groups.map((group) => {
            let { id, name, picture } = group.get();
            tempGroupsFind.push({ id, name, picture });
        });
        return tempGroupsFind;
    }
}
let GroupsService = new groupsService();
exports.default = GroupsService;
