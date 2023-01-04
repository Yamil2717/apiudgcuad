"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.getImage = exports.uploadImage = exports.upload = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const env_1 = __importDefault(require("../utils/env"));
async function uploadImage(req, res) {
    try {
        let { type } = req.params;
        if (type !== "publications") {
            let file = req.files;
            if (!file[0]) {
                return resAPI.error(res, "No se envió la fotografía");
            }
            console.info(`Se ha guardado una imagen en ${JSON.stringify(file[0].path)}`);
            resAPI.success(res, `${env_1.default.api.urlAPI}/images/${type}/${file[0].filename}`);
        }
        else {
            let tempReqFiles = req.files;
            req.files = [...tempReqFiles];
            if (req.files.length <= 0) {
                return resAPI.error(res, "No se ha recibido las fotografías");
            }
            let arrayUrls = [];
            req.files.map((file) => {
                console.info(`Se ha guardado una imagen en ${JSON.stringify(file.path)}`);
                arrayUrls.push(`${env_1.default.api.urlAPI}/images/${type}/${file.filename}`);
            });
            resAPI.success(res, arrayUrls);
        }
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 400);
    }
}
exports.uploadImage = uploadImage;
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
async function deleteImage(req, res) {
    try {
        let { type, fileName } = req.params;
        if (fileName === "default.jpeg") {
            return resAPI.success(res, "ok");
        }
        let pathImage = path_1.default.resolve(`./imagesUpload/${type}/${fileName}`);
        fs_1.default.unlink(pathImage, (err) => {
            if (err) {
                resAPI.error(res, "No existe esa imagen.");
            }
            else {
                console.log(`Se ha eliminado la imagen de la ruta ${pathImage}`);
                resAPI.success(res, "ok");
            }
        });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.deleteImage = deleteImage;
// Configs multer
function getStorage() {
    return multer_1.default.diskStorage({
        destination(req, file, callback) {
            let { type } = req.params;
            callback(null, `./imagesUpload/${type}`);
        },
        filename(req, file, callback) {
            callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split("/")[1]}`);
        },
    });
}
function upload() {
    return (0, multer_1.default)({
        storage: getStorage(),
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
}
exports.upload = upload;
