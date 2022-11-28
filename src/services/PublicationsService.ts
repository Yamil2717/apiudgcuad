import { Publication } from '../models/Publications';


class publicationsService {

    async createPublication(description: string, pictures: Array<string>, pictureGroup: string, groupID: number, groupName: string, categoryID: number, ownerID: string, ownerName: string) {
        let publication = await Publication.create({
            description,
            pictures: JSON.stringify(pictures),
            pictureGroup,
            groupID,
            groupName,
            categoryID,
            ownerID,
            ownerName
        });
        if (!publication) throw new Error('Ha ocurrido un error y no sé pudo crear el post');
        return publication;
    }

    async getAllPublications() {
        let publications: any = await Publication.findAll();
        if (publications.length <= 0) throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de post registrado.');
        return { data: publications };
    }

}

let PublicationsService = new publicationsService;

export default PublicationsService;