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

  async getPublicationByID(idPublication: string, idOwner: string) {
    let publication: any = await Publication.findOne({
      where: { id: idPublication },
      include: [
        { model: User, attributes: ["name"], required: true },
        {
          model: Groups,
          attributes: ["id", "name", "picture"],
          required: true,
        },
      ],
    });
    let reaction = await ReactionsService.getReactionPublication(
      publication.id,
      idOwner
    );
    publication.setDataValue("reaction", reaction);
    if (!publication)
      throw new Error(
        "Ha ocurrido un error y no sé encontró el post solicitado."
      );
    return publication.get();
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
    publicationsData.sort((a: any, b: any) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
    );
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
    publicationsData.sort((a: any, b: any) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
    );
    return publicationsData;
  }

  async getAllPublicationsFromGroupID(groupID: string, userID: string) {
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
      where: { groupID },
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
    publicationsData.sort((a: any, b: any) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
    );
    return publicationsData;
  }
}

let PublicationsService = new publicationsService();

export default PublicationsService;
