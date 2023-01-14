"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionOnComment = exports.getAllCommentsByID = exports.createCommentByID = void 0;
const tools_1 = require("../lib/tools");
const CommentsService_1 = __importDefault(require("../services/CommentsService"));
const ReactionsComments_1 = __importDefault(require("../services/ReactionsComments"));
const resAPI = new tools_1.Response();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function getAllCommentsByID(req, res) {
    try {
        let { idPost } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let comments = await CommentsService_1.default.getAllCommentsByPostID(idPost, payloadToken.id);
        console.info(`SOMEONE GET ALL COMMENTS IN POST ID ${idPost}`);
        resAPI.success(res, comments);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllCommentsByID = getAllCommentsByID;
async function createCommentByID(req, res) {
    try {
        let { idPublication, comment, ownerID, idFatherComment } = req.body;
        let comments = await CommentsService_1.default.putCommentByPostID(idPublication, comment, ownerID, idFatherComment);
        console.info(`SOMEONE MAKE A COMMENT`);
        resAPI.success(res, comments);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.createCommentByID = createCommentByID;
async function addReactionOnComment(req, res) {
    try {
        let { idComment, ownerID, action } = req.body;
        let reaction = await ReactionsComments_1.default.addReactionsComment(idComment, ownerID, action);
        console.info(`USER ID: ${ownerID} ADD A REACTION IN COMMENT ID ${idComment}`);
        resAPI.success(res, reaction);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.addReactionOnComment = addReactionOnComment;
