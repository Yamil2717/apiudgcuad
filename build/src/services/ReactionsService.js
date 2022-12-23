"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reactions_1 = require("../models/Reactions");
const Publications_1 = require("../models/Publications");
class reactionsService {
    async addReactionsPublication(idPublication, ownerID, action) {
        let reactionExist = await Reactions_1.Reactions.findOne({
            where: { idPublication, ownerID },
        });
        if (reactionExist) {
            let reactionDB = reactionExist.get();
            let publication = await Publications_1.Publication.findOne({
                where: { id: idPublication },
            });
            if (reactionDB.action === action) {
                await Reactions_1.Reactions.update({
                    action: 0,
                }, {
                    where: {
                        idPublication,
                        ownerID,
                    },
                });
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
            }
            else if (reactionDB.action === 0) {
                await Reactions_1.Reactions.update({
                    action,
                }, {
                    where: {
                        idPublication,
                        ownerID,
                    },
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
            else {
                console.log(reactionDB.action);
                console.log(action);
                await Reactions_1.Reactions.update({
                    action,
                }, {
                    where: {
                        idPublication,
                        ownerID,
                    },
                });
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
                console.log("xd");
            }
        }
        else {
            let publication = await Publications_1.Publication.findOne({
                where: { id: idPublication },
            });
            await Reactions_1.Reactions.create({
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
    async getReactionPublication(idPublication, ownerID) {
        let reaction = await Reactions_1.Reactions.findOne({
            where: { idPublication, ownerID },
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
function incrementReaction(publication, typeReaction, increment) {
    publication?.increment(typeReaction, { by: increment });
}
function decrementReaction(publication, typeReaction, increment) {
    publication?.decrement(typeReaction, { by: increment });
}
let ReactionsService = new reactionsService();
exports.default = ReactionsService;
