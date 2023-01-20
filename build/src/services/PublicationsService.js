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
    async getAllPublicationsHome(userID, page) {
        let publications = await Publications_1.Publication.findAll({
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
        await Promise.all(publications.slice(page, page + 15).map(async (publication) => {
            let reaction = await ReactionsService_1.default.getReactionPublication(publication.id, userID);
            publication.setDataValue("reaction", reaction);
            await publicationsData.push(publication.get());
        }));
        if (publicationsData.length <= 0) {
            publicationsData = [];
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de post registrado.");
        }
        return await SortPublications(publicationsData);
    }
    async getAllPublicationsFromUserID(ownerID, userID, page) {
        let publications = await Publications_1.Publication.findAll({
            offset: page,
            limit: 15,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User_1.User,
                    attributes: ["name"],
                    required: true,
                },
                {
                    model: Groups_1.Groups,
                    attributes: ["id", "name", "picture"],
                    required: true,
                },
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
    async getAllPublicationsFromGroupID(groupID, userID, page) {
        let publications = await Publications_1.Publication.findAll({
            offset: page,
            limit: 15,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User_1.User,
                    attributes: ["name"],
                    required: true,
                },
                {
                    model: Groups_1.Groups,
                    attributes: ["id", "name", "picture"],
                    required: true,
                },
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
async function SortPublications(data) {
    data.sort((a, b) => {
        let totalCountLikesA = a.likePositive + a.likeNeutral - a.likeNegative;
        let totalCountLikesB = b.likePositive + b.likeNeutral - b.likeNegative;
        let averageLikesAndCommentsA = a.commentCount + totalCountLikesA / 2;
        let averageLikesAndCommentsB = b.commentCount + totalCountLikesB / 2;
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        else if (a.createdAt > b.createdAt) {
            return -1;
        }
        else if (averageLikesAndCommentsA < averageLikesAndCommentsB) {
            return 1;
        }
        else if (averageLikesAndCommentsA > averageLikesAndCommentsB) {
            return -1;
        }
        else if (a.commentCount < b.commentCount) {
            return 1;
        }
        else if (a.commentCount > b.commentCount) {
            return -1;
        }
        else if (totalCountLikesA < totalCountLikesB) {
            return 1;
        }
        else if (totalCountLikesA > totalCountLikesB) {
            return -1;
        }
        else {
            return 0;
        }
    });
    return data;
}
let PublicationsService = new publicationsService();
exports.default = PublicationsService;
