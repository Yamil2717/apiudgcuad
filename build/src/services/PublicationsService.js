"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Groups_1 = require("../models/Groups");
const Publications_1 = require("../models/Publications");
const User_1 = require("../models/User");
const ReactionsService_1 = __importDefault(require("./ReactionsService"));
class publicationsService {
    async createPublication(title, description, pictures, groupID, categoryID, ownerID) {
        let publication = await Publications_1.Publication.create({
            title,
            description,
            pictures,
            categoryID,
            ownerID,
            groupID,
        });
        if (!publication)
            throw new Error("Ha ocurrido un error y no sé pudo crear el post");
        return true;
    }
    async getPublicationByID(idPublication, idOwner) {
        let publication = await Publications_1.Publication.findOne({
            where: { id: idPublication },
            include: [
                { model: User_1.User, attributes: ["name"], required: true },
                {
                    model: Groups_1.Groups,
                    attributes: ["id", "name", "picture"],
                    required: true,
                },
            ],
        });
        let reaction = await ReactionsService_1.default.getReactionPublication(publication.id, idOwner);
        publication.setDataValue("reaction", reaction);
        if (!publication)
            throw new Error("Ha ocurrido un error y no sé encontró el post solicitado.");
        return publication.get();
    }
    async getAllPublications(userID) {
        let publications = await Publications_1.Publication.findAll({
            limit: 15,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User_1.User,
                    attributes: ["name"],
                    required: true,
                },
                { model: Groups_1.Groups, required: true },
            ],
        });
        let publicationsData = [];
        await Promise.all(publications.map(async (publication) => {
            let reaction = await ReactionsService_1.default.getReactionPublication(publication.id, userID);
            publication.setDataValue("reaction", reaction);
            await publicationsData.push(publication.get());
        }));
        if (publicationsData.length <= 0) {
            publicationsData = [];
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de post registrado.");
        }
        publicationsData.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0);
        return publicationsData;
    }
    async getAllPublicationsFromUserID(ownerID, userID) {
        let publications = await Publications_1.Publication.findAll({
            limit: 15,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User_1.User,
                    attributes: ["name"],
                    required: true,
                },
                { model: Groups_1.Groups, required: true },
            ],
            where: { ownerID },
        });
        let publicationsData = [];
        await Promise.all(publications.map(async (publication) => {
            let reaction = await ReactionsService_1.default.getReactionPublication(publication.id, userID);
            publication.setDataValue("reaction", reaction);
            await publicationsData.push(publication.get());
        }));
        if (publicationsData.length <= 0) {
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de post registrado.");
        }
        publicationsData.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0);
        return publicationsData;
    }
    async getAllPublicationsFromGroupID(groupID, userID) {
        let publications = await Publications_1.Publication.findAll({
            limit: 15,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User_1.User,
                    attributes: ["name"],
                    required: true,
                },
                { model: Groups_1.Groups, required: true },
            ],
            where: { groupID },
        });
        let publicationsData = [];
        await Promise.all(publications.map(async (publication) => {
            let reaction = await ReactionsService_1.default.getReactionPublication(publication.id, userID);
            publication.setDataValue("reaction", reaction);
            await publicationsData.push(publication.get());
        }));
        if (publicationsData.length <= 0) {
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de post registrado.");
        }
        publicationsData.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0);
        return publicationsData;
    }
}
let PublicationsService = new publicationsService();
exports.default = PublicationsService;
