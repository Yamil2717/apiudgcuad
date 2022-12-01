import { Publication } from "../models/Publications";

class publicationsService {
  async createPublication(
    description: string,
    pictures: Array<string>,
    pictureGroup: string,
    groupID: number,
    groupName: string,
    categoryID: number,
    ownerID: string,
    ownerName: string
  ) {
    let publication = await Publication.create({
      description,
      pictures,
      pictureGroup,
      groupID,
      groupName,
      categoryID,
      ownerID,
      ownerName,
    });
    if (!publication)
      throw new Error("Ha ocurrido un error y no sé pudo crear el post");
    return true;
  }

  async getAllPublications() {
    let publications: any = await Publication.findAll({
      limit: 15,
      order: [["createdAt", "DESC"]],
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
