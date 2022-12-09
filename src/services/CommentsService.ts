import { Comments } from "../models/Comments";
import { Publication } from "../models/Publications";
import { User } from "../models/User";

class commentsService {
  async putCommentByPostID(
    idPublication: string,
    comment: string,
    ownerID: string,
    idFatherComment?: string
  ) {
    let publication = await Publication.findOne({
      where: { id: idPublication },
    });
    if (!publication)
      throw new Error(
        "Ha ocurrido un error, no se pudo publicar el comentario."
      );
    let commentInsert: any;
    if (!idFatherComment) {
      commentInsert = await Comments.create({
        idPublication,
        comment,
        ownerID,
      });
    } else {
      commentInsert = await Comments.create({
        idPublication,
        comment,
        ownerID,
        subComment: true,
        idFatherComment,
      });
    }
    publication?.increment("commentCount", { by: 1 });
    if (!commentInsert?._options?.isNewRecord)
      throw new Error(
        "Ha ocurrido un error, no se pudo publicar el comentario."
      );
    return true;
  }

  async getAllCommentsByPostID(idPublication: string) {
    let comments: any = await Comments.findAll({
      where: { idPublication },
      include: [
        {
          model: User,
          attributes: ["name", "avatar"],
          required: true,
        },
      ],
    });
    let commentsData: any = [];
    let tempArrayIndex: any = {};
    let tempIndex = 0;
    comments.map((comment: any) => {
      let dataComment = comment.get();
      if (!dataComment.idFatherComment) {
        tempArrayIndex[dataComment.id.toString()] = tempIndex;
        dataComment.subComments = [];
        commentsData[tempIndex] = { ...dataComment };
        tempIndex++;
      } else {
        let tempArray: any = [];
        if (
          commentsData[tempArrayIndex[dataComment.idFatherComment.toString()]]
            ?.subComments
        ) {
          tempArray =
            commentsData[tempArrayIndex[dataComment.idFatherComment.toString()]]
              .subComments;
        }
        tempArray.push(dataComment);
        commentsData[
          tempArrayIndex[dataComment.idFatherComment.toString()]
        ].subComments = tempArray;
      }
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
