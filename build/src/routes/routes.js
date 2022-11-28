"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validations_1 = require("../middlewares/Validations");
const Auth_1 = require("../middlewares/Auth");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const User_1 = require("../Validations/User");
const interestController_1 = require("../controllers/interestController");
const tools_1 = require("../lib/tools");
const tagsController_1 = require("../controllers/tagsController");
const imagesController_1 = require("../controllers/imagesController");
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
router.post('/images/user/upload', imagesController_1.uploadUser.single('avatar'), imagesController_1.uploadImage);
router.post('/images/group/upload', imagesController_1.uploadGroups.single('picture'), imagesController_1.uploadImage);
router.post('/images/dist/upload', imagesController_1.uploadGroups.single('picture'), imagesController_1.uploadImage);
router.post('/images/publication/upload', imagesController_1.uploadGroups.array('pictures'), imagesController_1.uploadImage);
router.get('/images/:type/:fileName', imagesController_1.getImage);
exports.default = router;
