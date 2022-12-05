"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comments_1 = require("../models/Comments");
class commentsService {
    async putCommentByPostID(id, commentText, ownerID, ownerName) {
        let comment = await Comments_1.Comments.create({
            idPost: id,
            comment: commentText,
            ownerID,
            ownerName,
            subCommentsCounter: 0,
        });
        console.log(comment);
        /*if (commentsData.length <= 0)
          throw new Error(
            "Ha ocurrido un error, no se encuentra ningún tipo de comentario registrado."
          );*/
        return true;
    }
    async getAllCommentsByPostID(id) {
        let comments = await Comments_1.Comments.findAll({ where: { id } });
        let commentsData = [];
        comments.map((group) => {
            commentsData.push(group.get());
        });
        if (commentsData.length <= 0)
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de comentario registrado.");
        return commentsData;
    }
}
let CommentsService = new commentsService();
exports.default = CommentsService;
