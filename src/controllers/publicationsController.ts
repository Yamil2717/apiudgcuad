import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import PublicationsService from "../services/PublicationsService";
import ReactionsService from "../services/ReactionsService";
import JWT from "jsonwebtoken";

async function createPublication(req: Request, res: Response) {
  try {
    let { title, description, pictures, groupID, categoryID, ownerID } =
      req.body;
    console.log(title, "aaa");
    let publication: any = await PublicationsService.createPublication(
      title,
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
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let publications: any = await PublicationsService.getAllPublications(
      payloadToken.id
    );
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
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let publications: any =
      await PublicationsService.getAllPublicationsFromUserID(
        ownerID,
        payloadToken.id
      );
    console.info(`SOMEONE GOT ALL THE PUBLICATIONS OF USER ID: ${ownerID}`);
    resAPI.success(res, publications);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function addReactionOnPublication(req: Request, res: Response) {
  try {
    let { idPublication, ownerID, action } = req.body;
    let reaction = await ReactionsService.addReactionsPublication(
      idPublication,
      ownerID,
      action
    );
    console.info(`USER ID: ${ownerID} ADD A REACTION`);
    resAPI.success(res, reaction);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export {
  createPublication,
  getAllPublications,
  getAllPublicationsFromUserID,
  addReactionOnPublication,
};
