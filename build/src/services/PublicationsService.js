"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publications_1 = require("../models/Publications");
class publicationsService {
    async createPublication(description, pictures, pictureGroup, groupID, groupName, categoryID, ownerID, ownerName) {
        let publication = await Publications_1.Publication.create({
            description,
            pictures: JSON.stringify(pictures),
            pictureGroup,
            groupID,
            groupName,
            categoryID,
            ownerID,
            ownerName
        });
        if (!publication)
            throw new Error('Ha ocurrido un error y no sé pudo crear el post');
        return publication;
    }
    async getAllPublications() {
        let publications = await Publications_1.Publication.findAll();
        if (publications.length <= 0)
            throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de interés registrado.');
        return { data: publications };
    }
}
let PublicationsService = new publicationsService;
exports.default = PublicationsService;
