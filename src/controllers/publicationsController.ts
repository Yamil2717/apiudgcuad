import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import PublicationsService from "../services/PublicationsService";

async function createPublication(req: Request, res: Response) {
  try {
    let { description, pictures, groupID, categoryID, ownerID } = req.body;
    let publication: any = await PublicationsService.createPublication(
      description,
      pictures,
      groupID,
      categoryID,
      ownerID
    );
    if (!publication) return;
    console.info(`SOMEONE CREATE A NEW PUBLICATION`);
    resAPI.success(res, { message: "Ha creado la publicación correctamente." });
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getAllPublications(req: Request, res: Response) {
  try {
    let publications: any = await PublicationsService.getAllPublications();
    console.info(`SOMEONE GOT ALL THE PUBLICATIONS`);
    resAPI.success(res, publications);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getAllPublicationsFromUserID(req: Request, res: Response) {
  try {
    let { ownerID } = req.params;
    let publications: any =
      await PublicationsService.getAllPublicationsFromUserID(ownerID);
    console.info(`SOMEONE GOT ALL THE PUBLICATIONS OF USER ID: ${ownerID}`);
    resAPI.success(res, publications);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export { createPublication, getAllPublications, getAllPublicationsFromUserID };
