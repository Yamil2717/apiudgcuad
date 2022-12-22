import { Groups } from "../models/Groups";
import { Publication } from "../models/Publications";
import { User } from "../models/User";

class publicationsService {
  async createPublication(
    description: string,
    pictures: Array<string>,
    groupID: string,
    categoryID: string,
    ownerID: string
  ) {
    let publication = await Publication.create({
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

  async getAllPublications() {
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
    publications.map((publication: any) => {
      publicationsData.push(publication.get());
    });
    if (publicationsData.length <= 0) {
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de post registrado."
      );
    }

    return publicationsData;
  }

  async getAllPublicationsFromUserID(ownerID: string) {
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
    publications.map((publication: any) => {
      publicationsData.push(publication.get());
    });
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
