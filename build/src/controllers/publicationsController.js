"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublications = exports.createPublication = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const PublicationsService_1 = __importDefault(require("../services/PublicationsService"));
async function createPublication(req, res) {
    try {
        let { description, pictures, groupID, categoryID, ownerID } = req.body;
        let publication = await PublicationsService_1.default.createPublication(description, pictures, groupID, categoryID, ownerID);
        if (!publication)
            return;
        console.info(`SOMEONE CREATE A NEW PUBLICATION`);
        resAPI.success(res, { message: "Ha creado la publicación correctamente." });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.createPublication = createPublication;
async function getAllPublications(req, res) {
    try {
        let publications = await PublicationsService_1.default.getAllPublications();
        console.info(`SOMEONE GOT ALL THE PUBLICATIONS`);
        resAPI.success(res, publications);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllPublications = getAllPublications;
