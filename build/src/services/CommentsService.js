"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comments_1 = require("../models/Comments");
class commentsService {
    async putCommentByPostID(id, commentText, ownerID, ownerName, photoUrl) {
        let comment = await Comments_1.Comments.create({
            idPost: id,
            comment: commentText,
            ownerID,
            ownerName,
            photoUrl,
            subCommentsCounter: 0,
        });
        if (!comment?._options?.isNewRecord)
            throw new Error("Ha ocurrido un error, no se pudo publicar el comentario.");
        return true;
    }
    async getAllCommentsByPostID(idPost) {
        let comments = await Comments_1.Comments.findAll({ where: { idPost } });
        let commentsData = [];
        comments.map((comment) => {
            commentsData.push(comment.get());
        });
        if (commentsData.length <= 0)
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de comentario registrado para ese post.");
        return commentsData;
    }
}
let CommentsService = new commentsService();
exports.default = CommentsService;
