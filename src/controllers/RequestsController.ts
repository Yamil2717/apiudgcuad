import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
import RequestsService from "../services/RequestsService";
const resAPI = new response();
import JWT from "jsonwebtoken";

async function sendRequestUserFriend(req: Request, res: Response) {
  try {
    let { id } = req.body;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let request: any = await RequestsService.sendRequestUser(
      payloadToken.id,
      id,
      1
    );
    console.info(
      `THE USER ID ${payloadToken.id} SEND A FRIEND REQUEST TO USER ID ${id}`
    );
    resAPI.success(res, request);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getRequestUser(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let request: any = await RequestsService.getRequestUser(
      payloadToken.id,
      id
    );
    console.info(
      `THE USER ID ${payloadToken.id} GET IF HAVE A REQUEST TO USER ID ${id}`
    );
    resAPI.success(res, request);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function deleteRequestUser(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let request: any = await RequestsService.deleteRequestUser(
      payloadToken.id,
      id
    );
    console.info(
      `THE USER ID ${payloadToken.id} DELETE THE REQUEST TO USER ID ${id}`
    );
    resAPI.success(res, request);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export { sendRequestUserFriend, getRequestUser, deleteRequestUser };
