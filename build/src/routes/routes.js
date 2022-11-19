"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validations_1 = require("../middlewares/Validations");
const Auth_1 = require("../middlewares/Auth");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const User_1 = require("../Validations/User");
const tools_1 = require("../lib/tools");
const path = require('node:path');
const response = new tools_1.Response();
const router = (0, express_1.Router)();
/* Users routes */
router.post('/user', (0, Validations_1.Validations)(User_1.createUserValidation, response), userController_1.createUser);
router.post('/user/auth', (0, Validations_1.Validations)(User_1.userLoginValidation, response), userController_1.loginUser);
/* End user routes */
/* Auth routes */
router.post('/user/auth/refreshToken', (0, Auth_1.Auth)('Admin', response), authController_1.refreshToken);
router.get('/privacy-and-policy', (req, res) => res.sendFile(path.join(__dirname, '../pages/privacyPolicy.html')));
/* End auth routes */
exports.default = router;
