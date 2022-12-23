import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import GroupsService from "../services/GroupsService";

async function createGroup(req: Request, res: Response) {
  try {
    let { name, description, picture, ownerID } = req.body;
    let groups: any = await GroupsService.createGroup(
      name,
      description,
      picture,
      ownerID
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

export { createGroup, getGroupById, getAllGroups };
