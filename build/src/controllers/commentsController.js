"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentsByID = exports.createCommentByID = void 0;
const tools_1 = require("../lib/tools");
const CommentsService_1 = __importDefault(require("../services/CommentsService"));
const resAPI = new tools_1.Response();
async function getAllCommentsByID(req, res) {
    try {
        let { idPost } = req.params;
        let comments = await CommentsService_1.default.getAllCommentsByPostID(idPost);
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
