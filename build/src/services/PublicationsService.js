"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Groups_1 = require("../models/Groups");
const Publications_1 = require("../models/Publications");
const User_1 = require("../models/User");
class publicationsService {
    async createPublication(description, pictures, groupID, categoryID, ownerID) {
        let publication = await Publications_1.Publication.create({
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
    async getAllPublications() {
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
        publications.map((publication) => {
            publicationsData.push(publication.get());
        });
        if (publicationsData.length <= 0) {
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de post registrado.");
        }
        return publicationsData;
    }
    async getAllPublicationsFromUserID(ownerID) {
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
        publications.map((publication) => {
            publicationsData.push(publication.get());
        });
        if (publicationsData.length <= 0) {
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de post registrado.");
        }
        return publicationsData;
    }
}
let PublicationsService = new publicationsService();
exports.default = PublicationsService;
