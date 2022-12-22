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
    let { type } = req.params;
    if (type !== "publications") {
      let file: any = req.files;
      if (!file[0]) {
        return resAPI.error(res, "No se envió la fotografía");
      }
      console.info(
        `Se ha guardado una imagen en ${JSON.stringify(file[0].path)}`
      );
      resAPI.success(
        res,
        `${env.api.urlAPI}/images/${type}/${file[0].filename}`
      );
    } else {
      let tempReqFiles: any = req.files;
      req.files = [...tempReqFiles];
      if (req.files.length <= 0) {
        return resAPI.error(res, "No se ha recibido las fotografías");
      }
      let arrayUrls: any = [];
      req.files.map((file: any) => {
        console.info(
          `Se ha guardado una imagen en ${JSON.stringify(file.path)}`
        );
        arrayUrls.push(`${env.api.urlAPI}/images/${type}/${file.filename}`);
      });
      resAPI.success(res, arrayUrls);
    }
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

async function deleteImage(req: Request, res: Response) {
  try {
    let { type, fileName } = req.params;
    let pathImage = path.resolve(`./imagesUpload/${type}/${fileName}`);
    fs.unlink(pathImage, (err) => {
      if (err) {
        resAPI.error(res, "No existe esa imagen.");
      } else {
        resAPI.success(res, "ok");
      }
    });
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

// Configs multer

function getStorage() {
  return multer.diskStorage({
    destination(req, file, callback) {
      let { type } = req.params;
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
}

function upload() {
  return multer({
    storage: getStorage(),
    limits: { fileSize: 4 * 1024 * 1024 },
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
}

export { upload, uploadImage, getImage, deleteImage };
