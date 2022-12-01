import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import GroupsService from "../services/GroupsService";

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

export { getAllGroups };
