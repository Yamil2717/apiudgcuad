import { Comments } from "../models/Comments";

class commentsService {
  async putCommentByPostID(
    id: string,
    commentText: string,
    ownerID: string,
    ownerName: string,
    photoUrl: string
  ) {
    let comment: any = await Comments.create({
      idPost: id,
      comment: commentText,
      ownerID,
      ownerName,
      photoUrl,
      subCommentsCounter: 0,
    });
    if (!comment?._options?.isNewRecord)
      throw new Error(
        "Ha ocurrido un error, no se pudo publicar el comentario."
      );
    return true;
  }

  async getAllCommentsByPostID(idPost: string) {
    let comments: any = await Comments.findAll({ where: { idPost } });
    let commentsData: any = [];
    comments.map((comment: any) => {
      commentsData.push(comment.get());
    });
    if (commentsData.length <= 0)
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de comentario registrado para ese post."
      );
    return commentsData;
  }
}

let CommentsService = new commentsService();

export default CommentsService;
