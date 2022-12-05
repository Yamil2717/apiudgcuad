import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
import CommentsService from "../services/CommentsService";
const resAPI = new response();

async function getAllCommentsByID(req: Request, res: Response) {
  try {
    let { idPost } = req.params;
    let comments: any = await CommentsService.getAllCommentsByPostID(idPost);
    console.info(`SOMEONE GET ALL COMMENTS IN POST ID ${idPost}`);
    resAPI.success(res, comments);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function createCommentByID(req: Request, res: Response) {
  try {
    let { idPost, comment, ownerID, ownerName, photoUrl } = req.body;
    let comments: any = await CommentsService.putCommentByPostID(
      idPost,
      comment,
      ownerID,
      ownerName,
      photoUrl
    );
    console.info(`SOMEONE MAKE A COMMENT`);
    resAPI.success(res, comments);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export { createCommentByID, getAllCommentsByID };
