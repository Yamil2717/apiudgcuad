import { ReactionsComments } from "../models/ReactionsComments";
import { Comments } from "../models/Comments";

class reactionsCommentsService {
  async addReactionsComment(
    idComment: string,
    ownerID: string,
    action: number
  ) {
    let reactionExist = await ReactionsComments.findOne({
      where: { idComment, ownerID },
    });
    if (reactionExist) {
      let reactionDB = reactionExist.get();
      let comment = await Comments.findOne({
        where: { id: idComment },
      });
      if (reactionDB.action === action) {
        await ReactionsComments.update(
          {
            action: 0,
          },
          {
            where: {
              idComment,
              ownerID,
            },
          }
        );
        switch (action) {
          case 1:
            decrementReaction(comment, "likePositive", 2);
            break;
          case 2:
            decrementReaction(comment, "likeNeutral", 1);
            break;
          case 3:
            decrementReaction(comment, "likeNegative", 1);
            break;
          default:
            return false;
        }
        return true;
      } else if (reactionDB.action === 0) {
        await ReactionsComments.update(
          {
            action,
          },
          {
            where: {
              idComment,
              ownerID,
            },
          }
        );
        switch (action) {
          case 1:
            incrementReaction(comment, "likePositive", 2);
            break;
          case 2:
            incrementReaction(comment, "likeNeutral", 1);
            break;
          case 3:
            incrementReaction(comment, "likeNegative", 1);
            break;
          default:
            return false;
        }
        return true;
      } else {
        await ReactionsComments.update(
          {
            action,
          },
          {
            where: {
              idComment,
              ownerID,
            },
          }
        );
        switch (action) {
          case 1:
            incrementReaction(comment, "likePositive", 2);
            switch (reactionDB.action) {
              case 1:
                decrementReaction(comment, "likePositive", 2);
                break;
              case 2:
                decrementReaction(comment, "likeNeutral", 1);
                break;
              case 3:
                decrementReaction(comment, "likeNegative", 1);
                break;
            }
            break;
          case 2:
            incrementReaction(comment, "likeNeutral", 1);
            switch (reactionDB.action) {
              case 1:
                decrementReaction(comment, "likePositive", 2);
                break;
              case 2:
                decrementReaction(comment, "likeNeutral", 1);
                break;
              case 3:
                decrementReaction(comment, "likeNegative", 1);
                break;
            }
            break;
          case 3:
            incrementReaction(comment, "likeNegative", 1);
            switch (reactionDB.action) {
              case 1:
                decrementReaction(comment, "likePositive", 2);
                break;
              case 2:
                decrementReaction(comment, "likeNeutral", 1);
                break;
              case 3:
                decrementReaction(comment, "likeNegative", 1);
                break;
            }
            break;
          default:
            return false;
        }
      }
    } else {
      let comment = await Comments.findOne({
        where: { id: idComment },
      });
      await ReactionsComments.create({
        idComment,
        ownerID,
        action,
      });
      switch (action) {
        case 1:
          incrementReaction(comment, "likePositive", 2);
          break;
        case 2:
          incrementReaction(comment, "likeNeutral", 1);
          break;
        case 3:
          incrementReaction(comment, "likeNegative", 1);
          break;
        default:
          return false;
      }
      return true;
    }
  }
  async getReactionComment(idComment: string, ownerID: string) {
    let reaction = await ReactionsComments.findOne({
      where: { idComment, ownerID },
    });
    if (!reaction) {
      return { liked: false, action: 0 };
    } else {
      let { action } = reaction.get();
      let liked = action === 0 ? false : true;
      return { liked, action };
    }
  }
}

async function incrementReaction(
  comment: any,
  typeReaction: string,
  increment: number
) {
  comment?.increment(typeReaction, { by: increment });
}

async function decrementReaction(
  comment: any,
  typeReaction: string,
  increment: number
) {
  comment?.decrement(typeReaction, { by: increment });
}

let ReactionsCommentsService = new reactionsCommentsService();

export default ReactionsCommentsService;
