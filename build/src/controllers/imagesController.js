"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadImagePublications = exports.uploadImage = exports.upload = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const env_1 = __importDefault(require("../utils/env"));
async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return resAPI.error(res, "No se envió la fotografía");
        }
        console.info(`Se ha guardado una imagen en ${JSON.stringify(req.file.path)}`);
        resAPI.success(res, `${env_1.default.api.urlAPI}/images/user/${req.file.filename}`);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 400);
    }
}
exports.uploadImage = uploadImage;
async function uploadImagePublications(req, res) {
    try {
        let tempReqFiles = req.files;
        req.files = [...tempReqFiles];
        if (req.files.length <= 0) {
            return resAPI.error(res, "No se ha recibido las fotografías");
        }
        let arrayUrls = [];
        req.files.map((file) => {
            console.info(`Se ha guardado una imagen en ${JSON.stringify(file.path)}`);
            arrayUrls.push(`${env_1.default.api.urlAPI}/images/publications/${file.filename}`);
        });
        resAPI.success(res, arrayUrls);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 400);
    }
}
exports.uploadImagePublications = uploadImagePublications;
async function getImage(req, res) {
    try {
        let { type, fileName } = req.params;
        let pathImage = path_1.default.resolve(`./imagesUpload/${type}/${fileName}`);
        if (await fs_1.default.existsSync(pathImage)) {
            res.sendFile(pathImage);
        }
        else {
            resAPI.error(res, "No se encontró.", 404);
        }
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getImage = getImage;
// Configs multer
function getStorage(type) {
    const Storage = multer_1.default.diskStorage({
        destination(req, file, callback) {
            callback(null, `./imagesUpload/${type}`);
        },
        filename(req, file, callback) {
            callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split("/")[1]}`);
        },
    });
    return Storage;
}
function upload(type) {
    let upload = (0, multer_1.default)({
        storage: getStorage(type),
        limits: { fileSize: 6 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg") {
                cb(null, true);
            }
            else {
                cb(null, false);
                const err = new Error("Solo se permiten los siguientes formatos: .png, .jpg y .jpeg");
                err.name = "ExtensionError";
                return cb(err);
            }
        },
    });
    return upload;
}
exports.upload = upload;
