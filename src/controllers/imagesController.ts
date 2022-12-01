import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
const resAPI = new response();
import path from "path";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import env from "../utils/env";

async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return resAPI.error(res, "No se envió la fotografía");
    }
    console.info(
      `Se ha guardado una imagen en ${JSON.stringify(req.file.path)}`
    );
    resAPI.success(res, `${env.api.urlAPI}/images/user/${req.file.filename}`);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 400);
  }
}
async function uploadImagePublications(req: Request, res: Response) {
  try {
    let tempReqFiles: any = req.files;
    req.files = [...tempReqFiles];
    if (req.files.length <= 0) {
      return resAPI.error(res, "No se ha recibido las fotografías");
    }
    let arrayUrls: any = [];
    req.files.map((file: any) => {
      console.info(`Se ha guardado una imagen en ${JSON.stringify(file.path)}`);
      arrayUrls.push(`${env.api.urlAPI}/images/publications/${file.filename}`);
    });
    resAPI.success(res, arrayUrls);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 400);
  }
}

async function getImage(req: Request, res: Response) {
  try {
    let { type, fileName } = req.params;
    let pathImage = path.resolve(`./imagesUpload/${type}/${fileName}`);
    if (await fs.existsSync(pathImage)) {
      res.sendFile(pathImage);
    } else {
      resAPI.error(res, "No se encontró.", 404);
    }
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

// Configs multer

function getStorage(type: string) {
  const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, `./imagesUpload/${type}`);
    },
    filename(req, file, callback) {
      callback(
        null,
        `${file.fieldname}_${uuidv4()}_${Date.now()}.${
          file.mimetype.split("/")[1]
        }`
      );
    },
  });
  return Storage;
}

function upload(type: string) {
  let upload = multer({
    storage: getStorage(type),
    limits: { fileSize: 6 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error(
          "Solo se permiten los siguientes formatos: .png, .jpg y .jpeg"
        );
        err.name = "ExtensionError";
        return cb(err);
      }
    },
  });
  return upload;
}

export { upload, uploadImage, uploadImagePublications, getImage };
