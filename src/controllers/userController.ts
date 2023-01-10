import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
import UserService from "../services/UserServices";
const resAPI = new response();
import JWT from "jsonwebtoken";

async function createUser(req: Request, res: Response) {
  try {
    let {
      name,
      email,
      password,
      countryIndicator,
      phone,
      postalCode,
      roleId,
      tagsIds,
      interestIds,
      location,
      dateBirth,
      avatar,
    } = req.body;
    let user: any = await UserService.userRegister(
      name,
      email,
      password,
      countryIndicator,
      phone,
      postalCode,
      roleId,
      tagsIds,
      interestIds,
      location,
      dateBirth,
      avatar
    );
    console.info(`USER CREATED, UUID: ${user.id}`);
    resAPI.success(res, { message: "Se ha registrado correctamente." });
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 409);
  }
}

async function updateData(req: Request, res: Response) {
  try {
    let {
      name,
      email,
      password,
      countryIndicator,
      phone,
      postalCode,
      roleId,
      oldPassword,
    } = req.body;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let user: any = await UserService.updateData(payloadToken.id, oldPassword, {
      name,
      email,
      password,
      countryIndicator,
      phone,
      postalCode,
      roleId,
    });
    console.info(`USER DATA UPDATE, UUID: ${payloadToken.id}`);
    resAPI.success(res, user);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 409);
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    let { email, password } = req.body;
    let token = await UserService.userLogin(email, password);
    res.cookie("refresh_token", token.refreshToken, { httpOnly: true });
    console.info(`USER LOGIN, EMAIL: ${email}`);
    resAPI.success(res, { message: "Ha ingresado correctamente.", ...token });
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getTypesUser(req: Request, res: Response) {
  try {
    let typesUser = await UserService.userTypes();
    console.info("SOMEONE GOT THE LIST OF USER TYPES");
    resAPI.success(res, typesUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getUserByToken(req: Request, res: Response) {
  try {
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.userGetById(payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getUserByID(req: Request, res: Response) {
  try {
    let { id } = req.params;
    if (!id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.userGetById(id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function updateAvatar(req: Request, res: Response) {
  try {
    let { url } = req.body;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.userUpdateAvatar(url, payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function updateHeader(req: Request, res: Response) {
  try {
    let { url } = req.body;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.userUpdateHeader(url, payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function toggleFollow(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.toggleFollow(id, payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function addGroup(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.addGroup(id, payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function addFriend(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.addFriend(id, payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function deleteFriend(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.deleteFriend(id, payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function getAllMyFriends(req: Request, res: Response) {
  try {
    let authorization: any = req.headers.authorization;
    let token = authorization.split(" ");
    let payloadToken: any = JWT.decode(token[1]);
    if (!payloadToken.id) {
      resAPI.error(res, "No se ha podido obtener el id del usuario.");
    }
    let dataUser = await UserService.getAllMyFriends(payloadToken.id);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

async function searchUserByPartialName(req: Request, res: Response) {
  try {
    let { search } = req.body;
    let dataUser = await UserService.searchUserByPartialName(search);
    resAPI.success(res, dataUser);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export {
  createUser,
  loginUser,
  getTypesUser,
  getUserByToken,
  getUserByID,
  updateData,
  updateAvatar,
  updateHeader,
  toggleFollow,
  addGroup,
  addFriend,
  deleteFriend,
  getAllMyFriends,
  searchUserByPartialName,
};
