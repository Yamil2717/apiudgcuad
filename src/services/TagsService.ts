import { Tags } from '../models/Tag';


class tagsService {

    async getAllTags() {
        let tags: any = await Tags.findAll();
        let tagsData: any = {};
        for (let index in tags) {
            if (!tagsData[tags[index].dataValues.idCategory]) {
                tagsData[tags[index].dataValues.idCategory] = [{ ...tags[index].dataValues, id: index }]
            } else {
                let tempData = [...tagsData[tags[index].dataValues.idCategory]];
                tempData.push({ ...tags[index].dataValues, id: index })
                tagsData[tags[index].dataValues.idCategory] = [...tempData]
            }
        }
        if (Object.keys(tagsData).length <= 0) throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de tags de intereses registrado.');
        return { data: tagsData };
    }

}

let TagsService = new tagsService;

export default TagsService;