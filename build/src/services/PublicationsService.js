"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publications_1 = require("../models/Publications");
class publicationsService {
    async createPublication(description, pictures, pictureGroup, groupID, groupName, categoryID, ownerID, ownerName) {
        let publication = await Publications_1.Publication.create({
            description,
            pictures,
            pictureGroup,
            groupID,
            groupName,
            categoryID,
            ownerID,
            ownerName,
        });
        if (!publication)
            throw new Error("Ha ocurrido un error y no sé pudo crear el post");
        return true;
    }
    async getAllPublications() {
        let publications = await Publications_1.Publication.findAll({
            limit: 15,
            order: [["createdAt", "DESC"]],
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
