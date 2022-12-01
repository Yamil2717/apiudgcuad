import { Tags } from "../models/Tag";

class tagsService {
  async getAllTags() {
    let tags: any = await Tags.findAll();
    let tagsData: any = {};
    tags.map((tag: any) => {
      let { id, hashtag, idCategory } = tag.get();
      if (!tagsData[idCategory]) {
        tagsData[idCategory] = [{ id, hashtag, idCategory }];
      } else {
        tagsData[idCategory] = [
          ...tagsData[idCategory],
          { id, hashtag, idCategory },
        ];
      }
    });
    if (Object.keys(tagsData).length <= 0) {
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de tags de intereses registrado."
      );
    }
    return tagsData;
  }
}

let TagsService = new tagsService();

export default TagsService;
