import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import GroupsService from "../services/GroupsService";
import JWT from "jsonwebtoken";

async function createGroup(req: Request, res: Response) {
  try {
    let { name, description, picture, ownerID, idCategory } = req.body;
    let groups: any = await GroupsService.createGroup(
      name,
      description,
      picture,
      ownerID,
      idCategory
    );
    console.info(`SOMEONE CREATE A NEW GROUPS`);
    resAPI.success(res, groups);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getGroupById(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let group: any = await GroupsService.getGroupById(id);
    console.info(`SOMEONE GET A GROUP ID ${id}`);
    resAPI.success(res, group);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getAllGroups(req: Request, res: Response) {
  try {
    let groups: any = await GroupsService.getAllGroups();
    console.info(`SOMEONE GOT THE LIST OF GROUPS`);
    resAPI.success(res, groups);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getAllMyGroups(req: Request, res: Response) {
  try {
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let groups: any = await GroupsService.getAllMyGroups(payloadToken.id);
    console.info(`THE ID : ${payloadToken.id} GOT ALL HE GROUPS`);
    resAPI.success(res, groups);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function updatePictureGroup(req: Request, res: Response) {
  try {
    let { url } = req.body;
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataGroup = await GroupsService.groupUpdatePicture(
      url,
      id,
      payloadToken.id
    );
    console.info(
      `THE ID ${payloadToken.id} UPDATE THE PICTURE OF GROUP ID ${id}`
    );
    resAPI.success(res, dataGroup);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function updateHeaderGroup(req: Request, res: Response) {
  try {
    let { url } = req.body;
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataGroup = await GroupsService.groupUpdateHeader(
      url,
      id,
      payloadToken.id
    );
    console.info(
      `THE ID ${payloadToken.id} UPDATE THE HEADER OF GROUP ID ${id}`
    );
    resAPI.success(res, dataGroup);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export {
  createGroup,
  getGroupById,
  getAllMyGroups,
  updatePictureGroup,
  updateHeaderGroup,
};
