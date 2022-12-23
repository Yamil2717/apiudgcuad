"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionOnPublication = exports.getAllPublicationsFromUserID = exports.getAllPublications = exports.createPublication = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const PublicationsService_1 = __importDefault(require("../services/PublicationsService"));
const ReactionsService_1 = __importDefault(require("../services/ReactionsService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createPublication(req, res) {
    try {
        let { title, description, pictures, groupID, categoryID, ownerID } = req.body;
        console.log(title, "aaa");
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
        let { idPublication, ownerID, action } = req.body;
        let reaction = await ReactionsService_1.default.addReactionsPublication(idPublication, ownerID, action);
        console.info(`USER ID: ${ownerID} ADD A REACTION`);
        resAPI.success(res, reaction);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.addReactionOnPublication = addReactionOnPublication;
