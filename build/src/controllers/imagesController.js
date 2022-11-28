"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadImage = exports.uploadPublications = exports.uploadDist = exports.uploadGroups = exports.uploadUser = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return resAPI.error(res, 'No se envió la fotografía');
        }
        console.info(`Se ha guardado una imagen en ${JSON.stringify(req.file.path)}`);
        resAPI.success(res, {
            data: `http://192.168.20.20:4000/images/user/${req.file.filename}`
        });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
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
            resAPI.error(res, 'No se encontró.', 404);
        }
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getImage = getImage;
// Configs multer
const StorageUser = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/user');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});
const StorageGroups = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/groups');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});
const StorageDist = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/dist');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});
const StoragePublications = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/publications');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});
let uploadUser = (0, multer_1.default)({ storage: StorageUser, limits: { fileSize: 6291456 } });
exports.uploadUser = uploadUser;
let uploadGroups = (0, multer_1.default)({ storage: StorageGroups, limits: { fileSize: 6291456 } });
exports.uploadGroups = uploadGroups;
let uploadDist = (0, multer_1.default)({ storage: StorageDist, limits: { fileSize: 6291456 } });
exports.uploadDist = uploadDist;
let uploadPublications = (0, multer_1.default)({ storage: StoragePublications, limits: { fileSize: 6291456 } });
exports.uploadPublications = uploadPublications;
