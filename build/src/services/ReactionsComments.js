"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactionsComments_1 = require("../models/ReactionsComments");
const Comments_1 = require("../models/Comments");
class reactionsCommentsService {
    async addReactionsComment(idComment, ownerID, action) {
        let reactionExist = await ReactionsComments_1.ReactionsComments.findOne({
            where: { idComment, ownerID },
        });
        if (reactionExist) {
            let reactionDB = reactionExist.get();
            let comment = await Comments_1.Comments.findOne({
                where: { id: idComment },
            });
            if (reactionDB.action === action) {
                await ReactionsComments_1.ReactionsComments.update({
                    action: 0,
                }, {
                    where: {
                        idComment,
                        ownerID,
                    },
                });
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
            }
            else if (reactionDB.action === 0) {
                await ReactionsComments_1.ReactionsComments.update({
                    action,
                }, {
                    where: {
                        idComment,
                        ownerID,
                    },
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
            else {
                await ReactionsComments_1.ReactionsComments.update({
                    action,
                }, {
                    where: {
                        idComment,
                        ownerID,
                    },
                });
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
        }
        else {
            let comment = await Comments_1.Comments.findOne({
                where: { id: idComment },
            });
            await ReactionsComments_1.ReactionsComments.create({
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
    async getReactionComment(idComment, ownerID) {
        let reaction = await ReactionsComments_1.ReactionsComments.findOne({
            where: { idComment, ownerID },
        });
        if (!reaction) {
            return { liked: false, action: 0 };
        }
        else {
            let { action } = reaction.get();
            let liked = action === 0 ? false : true;
            return { liked, action };
        }
    }
}
async function incrementReaction(comment, typeReaction, increment) {
    comment?.increment(typeReaction, { by: increment });
}
async function decrementReaction(comment, typeReaction, increment) {
    comment?.decrement(typeReaction, { by: increment });
}
let ReactionsCommentsService = new reactionsCommentsService();
exports.default = ReactionsCommentsService;
