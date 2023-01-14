import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import PublicationsService from "../services/PublicationsService";
import ReactionsCommentsService from "../services/ReactionsComments";
import JWT from "jsonwebtoken";

async function createPublication(req: Request, res: Response) {
  try {
    let { title, description, pictures, groupID, categoryID, ownerID } =
      req.body;
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

async function getPublicationByID(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let publications: any = await PublicationsService.getPublicationByID(
      id,
      payloadToken.id
    );
    console.info(`SOMEONE GOT PUBLICATION: ${id}`);
    resAPI.success(res, publications);
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

async function getAllPublicationsFromGroupID(req: Request, res: Response) {
  try {
    let { groupID } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let publications: any =
      await PublicationsService.getAllPublicationsFromGroupID(
        groupID,
        payloadToken.id
      );
    console.info(`SOMEONE GOT ALL THE PUBLICATIONS OF GROUP ID: ${groupID}`);
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
    let { idComment, ownerID, action } = req.body;
    let reaction = await ReactionsCommentsService.addReactionsComment(
      idComment,
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
  getPublicationByID,
  getAllPublications,
  getAllPublicationsFromGroupID,
  getAllPublicationsFromUserID,
  addReactionOnPublication,
};
