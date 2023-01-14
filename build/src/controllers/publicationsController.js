"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionOnPublication = exports.getAllPublicationsFromUserID = exports.getAllPublicationsFromGroupID = exports.getAllPublications = exports.getPublicationByID = exports.createPublication = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const PublicationsService_1 = __importDefault(require("../services/PublicationsService"));
const ReactionsComments_1 = __importDefault(require("../services/ReactionsComments"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createPublication(req, res) {
    try {
        let { title, description, pictures, groupID, categoryID, ownerID } = req.body;
        let publication = await PublicationsService_1.default.createPublication(title, description, pictures, groupID, categoryID, ownerID);
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
async function getPublicationByID(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let publications = await PublicationsService_1.default.getPublicationByID(id, payloadToken.id);
        console.info(`SOMEONE GOT PUBLICATION: ${id}`);
        resAPI.success(res, publications);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getPublicationByID = getPublicationByID;
async function getAllPublications(req, res) {
    try {
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let publications = await PublicationsService_1.default.getAllPublications(payloadToken.id);
        console.info(`SOMEONE GOT ALL THE PUBLICATIONS`);
        resAPI.success(res, publications);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllPublications = getAllPublications;
async function getAllPublicationsFromGroupID(req, res) {
    try {
        let { groupID } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let publications = await PublicationsService_1.default.getAllPublicationsFromGroupID(groupID, payloadToken.id);
        console.info(`SOMEONE GOT ALL THE PUBLICATIONS OF GROUP ID: ${groupID}`);
        resAPI.success(res, publications);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllPublicationsFromGroupID = getAllPublicationsFromGroupID;
async function getAllPublicationsFromUserID(req, res) {
    try {
        let { ownerID } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let publications = await PublicationsService_1.default.getAllPublicationsFromUserID(ownerID, payloadToken.id);
        console.info(`SOMEONE GOT ALL THE PUBLICATIONS OF USER ID: ${ownerID}`);
        resAPI.success(res, publications);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllPublicationsFromUserID = getAllPublicationsFromUserID;
async function addReactionOnPublication(req, res) {
    try {
        let { idComment, ownerID, action } = req.body;
        let reaction = await ReactionsComments_1.default.addReactionsComment(idComment, ownerID, action);
        console.info(`USER ID: ${ownerID} ADD A REACTION`);
        resAPI.success(res, reaction);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.addReactionOnPublication = addReactionOnPublication;
