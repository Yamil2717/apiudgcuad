import { Reactions } from "../models/Reactions";
import { Publication } from "../models/Publications";

class reactionsService {
  async addReactionsPublication(
    idPublication: string,
    ownerID: string,
    action: number
  ) {
    let reactionExist = await Reactions.findOne({
      where: { idPublication, ownerID },
    });
    if (reactionExist) {
      let reactionDB = reactionExist.get();
      let publication = await Publication.findOne({
        where: { id: idPublication },
      });
      if (reactionDB.action === action) {
        await Reactions.update(
          {
            action: 0,
          },
          {
            where: {
              idPublication,
              ownerID,
            },
          }
        );
        switch (action) {
          case 1:
            decrementReaction(publication, "likePositive", 2);
            break;
          case 2:
            decrementReaction(publication, "likeNeutral", 1);
            break;
          case 3:
            decrementReaction(publication, "likeNegative", 1);
            break;
          default:
            return false;
        }
        return true;
      } else if (reactionDB.action === 0) {
        await Reactions.update(
          {
            action,
          },
          {
            where: {
              idPublication,
              ownerID,
            },
          }
        );
        switch (action) {
          case 1:
            incrementReaction(publication, "likePositive", 2);
            break;
          case 2:
            incrementReaction(publication, "likeNeutral", 1);
            break;
          case 3:
            incrementReaction(publication, "likeNegative", 1);
            break;
          default:
            return false;
        }
        return true;
      } else {
        await Reactions.update(
          {
            action,
          },
          {
            where: {
              idPublication,
              ownerID,
            },
          }
        );
        switch (action) {
          case 1:
            incrementReaction(publication, "likePositive", 2);
            switch (reactionDB.action) {
              case 1:
                decrementReaction(publication, "likePositive", 2);
                break;
              case 2:
                decrementReaction(publication, "likeNeutral", 1);
                break;
              case 3:
                decrementReaction(publication, "likeNegative", 1);
                break;
            }
            break;
          case 2:
            incrementReaction(publication, "likeNeutral", 1);
            switch (reactionDB.action) {
              case 1:
                decrementReaction(publication, "likePositive", 2);
                break;
              case 2:
                decrementReaction(publication, "likeNeutral", 1);
                break;
              case 3:
                decrementReaction(publication, "likeNegative", 1);
                break;
            }
            break;
          case 3:
            incrementReaction(publication, "likeNegative", 1);
            switch (reactionDB.action) {
              case 1:
                decrementReaction(publication, "likePositive", 2);
                break;
              case 2:
                decrementReaction(publication, "likeNeutral", 1);
                break;
              case 3:
                decrementReaction(publication, "likeNegative", 1);
                break;
            }
            break;
          default:
            return false;
        }
      }
    } else {
      let publication = await Publication.findOne({
        where: { id: idPublication },
      });
      await Reactions.create({
        idPublication,
        ownerID,
        action,
      });
      switch (action) {
        case 1:
          incrementReaction(publication, "likePositive", 2);
          break;
        case 2:
          incrementReaction(publication, "likeNeutral", 1);
          break;
        case 3:
          incrementReaction(publication, "likeNegative", 1);
          break;
        default:
          return false;
      }
      return true;
    }
  }
  async getReactionPublication(idPublication: string, ownerID: string) {
    let reaction = await Reactions.findOne({
      where: { idPublication, ownerID },
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
  publication: any,
  typeReaction: string,
  increment: number
) {
  publication?.increment(typeReaction, { by: increment });
}

async function decrementReaction(
  publication: any,
  typeReaction: string,
  increment: number
) {
  publication?.decrement(typeReaction, { by: increment });
}

let ReactionsService = new reactionsService();

export default ReactionsService;
