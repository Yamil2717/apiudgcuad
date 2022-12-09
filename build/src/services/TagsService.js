"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = require("../models/Tag");
class tagsService {
    async getAllTags() {
        let tags = await Tag_1.Tags.findAll();
        let tagsData = {};
        tags.map((tag) => {
            let { id, hashtag, idInterest } = tag.get();
            if (!tagsData[idInterest]) {
                tagsData[idInterest] = [{ id, hashtag, idInterest }];
            }
            else {
                tagsData[idInterest] = [
                    ...tagsData[idInterest],
                    { id, hashtag, idInterest },
                ];
            }
        });
        if (Object.keys(tagsData).length <= 0) {
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de tags de intereses registrado.");
        }
        return tagsData;
    }
}
let TagsService = new tagsService();
exports.default = TagsService;
