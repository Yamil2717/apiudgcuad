"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comments_1 = require("../models/Comments");
const Publications_1 = require("../models/Publications");
const User_1 = require("../models/User");
const ReactionsComments_1 = __importDefault(require("./ReactionsComments"));
class commentsService {
    async putCommentByPostID(idPublication, comment, ownerID, idFatherComment) {
        let publication = await Publications_1.Publication.findOne({
            where: { id: idPublication },
        });
        if (!publication)
            throw new Error("Ha ocurrido un error, no se pudo publicar el comentario.");
        let commentInsert;
        if (!idFatherComment) {
            commentInsert = await Comments_1.Comments.create({
                idPublication,
                comment,
                ownerID,
            });
        }
        else {
            commentInsert = await Comments_1.Comments.create({
                idPublication,
                comment,
                ownerID,
                subComment: true,
                idFatherComment,
            });
        }
        publication?.increment("commentCount", { by: 1 });
        if (!commentInsert?._options?.isNewRecord)
            throw new Error("Ha ocurrido un error, no se pudo publicar el comentario.");
        return true;
    }
    async getAllCommentsByPostID(idPublication, userID) {
        let comments = await Comments_1.Comments.findAll({
            where: { idPublication },
            include: [
                {
                    model: User_1.User,
                    attributes: ["name", "avatar"],
                    required: true,
                },
            ],
            order: [["createdAt", "ASC"]],
        });
        let commentsData = [];
        let tempArrayIndex = {};
        let tempIndex = 0;
        await Promise.all(comments.map(async (comment) => {
            let reaction = await ReactionsComments_1.default.getReactionComment(comment.id, userID);
            comment.setDataValue("reaction", reaction);
            let dataComment = comment.get();
            if (!dataComment.idFatherComment) {
                tempArrayIndex[dataComment.id.toString()] = tempIndex;
                dataComment.subComments = [];
                commentsData[tempIndex] = { ...dataComment };
                tempIndex++;
            }
            else {
                let tempArray = [];
                if (commentsData[tempArrayIndex[dataComment.idFatherComment.toString()]]
                    .subComments) {
                    tempArray =
                        commentsData[tempArrayIndex[dataComment.idFatherComment.toString()]].subComments || [];
                }
                tempArray.push(dataComment);
                commentsData[tempArrayIndex[dataComment.idFatherComment.toString()]].subComments = await SortComments(tempArray);
            }
        }));
        if (commentsData.length <= 0)
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de comentario registrado para ese post.");
        return await SortComments(commentsData);
    }
}
async function SortComments(data) {
    data.sort((a, b) => {
        let totalCountLikesA = a.likePositive + a.likeNeutral - a.likeNegative;
        let totalCountLikesB = b.likePositive + b.likeNeutral - b.likeNegative;
        if (totalCountLikesA > totalCountLikesB) {
            return -1;
        }
        else if (totalCountLikesA < totalCountLikesB) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return data;
}
let CommentsService = new commentsService();
exports.default = CommentsService;
