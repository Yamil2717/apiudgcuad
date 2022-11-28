import { Request, Response } from 'express';
import { Response as response } from '../lib/tools';
const resAPI = new response();
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

async function uploadImage(req: Request, res: Response) {
    try {
        if (!req.file) {
            return resAPI.error(res, 'No se envió la fotografía');
        }
        console.info(`Se ha guardado una imagen en ${JSON.stringify(req.file.path)}`)
        resAPI.success(res, {
            data: `http://https://habitandolametropoli.com/api/images/user/${req.file.filename}`
        });
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}
async function uploadImagePublications(req: Request, res: Response) {
    try {
        if (!req.file) {
            return resAPI.error(res, 'No se envió la fotografía');
        }
        console.info(`Se ha guardado una imagen en ${JSON.stringify(req.file.path)}`)
        resAPI.success(res, {
            data: `http://https://habitandolametropoli.com/api/images/user/${req.file.filename}`
        });
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}

async function getImage(req: Request, res: Response) {
    try {
        let { type, fileName } = req.params;
        let pathImage = path.resolve(`./imagesUpload/${type}/${fileName}`);
        if (await fs.existsSync(pathImage)) {
            res.sendFile(pathImage);
        } else {
            resAPI.error(res, 'No se encontró.', 404);
        }
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}

// Configs multer

const StorageUser = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/user');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${uuidv4()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

const StorageGroups = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/groups');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${uuidv4()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

const StorageDist = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/dist');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${uuidv4()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

const StoragePublications = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/publications');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${uuidv4()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

let uploadUser = multer({ storage: StorageUser, limits: { fileSize: 6291456 } })
let uploadGroups = multer({ storage: StorageGroups, limits: { fileSize: 6291456 } })
let uploadDist = multer({ storage: StorageDist, limits: { fileSize: 6291456 } })
let uploadPublications = multer({ storage: StoragePublications, limits: { fileSize: 6291456 } })


export { uploadUser, uploadGroups, uploadDist, uploadPublications, uploadImage, uploadImagePublications, getImage }
