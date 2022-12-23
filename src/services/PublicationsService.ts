import { Groups } from "../models/Groups";
import { Publication } from "../models/Publications";
import { User } from "../models/User";
import ReactionsService from "./ReactionsService";

class publicationsService {
  async createPublication(
    title: string,
    description: string,
    pictures: Array<string>,
    groupID: string,
    categoryID: string,
    ownerID: string
  ) {
    let publication = await Publication.create({
      title,
      description,
      pictures,
      categoryID,
      ownerID,
      groupID,
    });
    if (!publication)
      throw new Error("Ha ocurrido un error y no sé pudo crear el post");
    return true;
  }

  async getAllPublications(userID: string) {
    let publications: any = await Publication.findAll({
      limit: 15,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["name"],
          required: true,
        },
        { model: Groups, required: true },
      ],
    });
    let publicationsData: any = [];
    await Promise.all(
      publications.map(async (publication: any) => {
        let reaction = await ReactionsService.getReactionPublication(
          publication.id,
          userID
        );
        publication.setDataValue("reaction", reaction);
        await publicationsData.push(publication.get());
      })
    );
    if (publicationsData.length <= 0) {
      publicationsData = [];
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de post registrado."
      );
    }

    return publicationsData;
  }

  async getAllPublicationsFromUserID(ownerID: string, userID: string) {
    let publications: any = await Publication.findAll({
      limit: 15,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["name"],
          required: true,
        },
        { model: Groups, required: true },
      ],
      where: { ownerID },
    });
    let publicationsData: any = [];
    await Promise.all(
      publications.map(async (publication: any) => {
        let reaction = await ReactionsService.getReactionPublication(
          publication.id,
          userID
        );
        publication.setDataValue("reaction", reaction);
        await publicationsData.push(publication.get());
      })
    );
    if (publicationsData.length <= 0) {
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de post registrado."
      );
    }

    return publicationsData;
  }
}

let PublicationsService = new publicationsService();

export default PublicationsService;
