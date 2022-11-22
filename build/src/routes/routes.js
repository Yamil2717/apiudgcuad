"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validations_1 = require("../middlewares/Validations");
const Auth_1 = require("../middlewares/Auth");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const User_1 = require("../Validations/User");
const interestController_1 = require("../controllers/interestController");
const tools_1 = require("../lib/tools");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const tagsController_1 = require("../controllers/tagsController");
const path = require('node:path');
const response = new tools_1.Response();
const router = (0, express_1.Router)();
/* Users routes */
router.post('/user', (0, Validations_1.Validations)(User_1.createUserValidation, response), userController_1.createUser);
router.get('/user', (0, Auth_1.Auth)('User', response), userController_1.getUserById);
router.get('/user/types', userController_1.getTypesUser);
/* Auth routes */
router.post('/user/auth', (0, Validations_1.Validations)(User_1.userLoginValidation, response), userController_1.loginUser);
router.post('/user/auth/refreshToken', (0, Auth_1.Auth)('Admin', response), authController_1.refreshToken);
router.get('/privacy-and-policy', (req, res) => res.sendFile(path.join(__dirname, '../pages/privacyPolicy.html')));
/* Interest routes */
router.get('/interest', interestController_1.getAllInterest);
/* Tags routes */
router.get('/tags', tagsController_1.getAllTags);
/* Images routes */
const Storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${(0, uuid_1.v4)()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});
let upload = (0, multer_1.default)({ storage: Storage, limits: { fileSize: 6291456 } });
router.post('/user/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return response.error(res, 'No se envió la fotografía');
    }
    console.log(`Se ha guardado en ${JSON.stringify(req.file.path)}`);
    response.success(res, {
        data: req.file.path
    });
});
exports.default = router;
