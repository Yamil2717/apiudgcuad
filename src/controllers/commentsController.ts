import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
import CommentsService from "../services/CommentsService";
import ReactionsCommentsService from "../services/ReactionsComments";
const resAPI = new response();
import JWT from "jsonwebtoken";

async function getAllCommentsByID(req: Request, res: Response) {
  try {
    let { idPost } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let comments: any = await CommentsService.getAllCommentsByPostID(
      idPost,
      payloadToken.id
    );
    console.info(`SOMEONE GET ALL COMMENTS IN POST ID ${idPost}`);
    resAPI.success(res, comments);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function createCommentByID(req: Request, res: Response) {
  try {
    let { idPublication, comment, ownerID, idFatherComment } = req.body;
    let comments: any = await CommentsService.putCommentByPostID(
      idPublication,
      comment,
      ownerID,
      idFatherComment
    );
    console.info(`SOMEONE MAKE A COMMENT`);
    resAPI.success(res, comments);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function addReactionOnComment(req: Request, res: Response) {
  try {
    let { idComment, ownerID, action } = req.body;
    let reaction = await ReactionsCommentsService.addReactionsComment(
      idComment,
      ownerID,
      action
    );
    console.info(
      `USER ID: ${ownerID} ADD A REACTION IN COMMENT ID ${idComment}`
    );
    resAPI.success(res, reaction);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export { createCommentByID, getAllCommentsByID, addReactionOnComment };
