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
const tagsController_1 = require("../controllers/tagsController");
const groupsController_1 = require("../controllers/groupsController");
const publicationsController_1 = require("../controllers/publicationsController");
const path = require("node:path");
const commentsController_1 = require("../controllers/commentsController");
const imagesRoutes_1 = __importDefault(require("./imagesRoutes"));
const RequestsController_1 = require("../controllers/RequestsController");
const response = new tools_1.Response();
const router = (0, express_1.Router)();
// Users routes
router.post("/user", (0, Validations_1.Validations)(User_1.createUserValidation, response), userController_1.createUser);
router.put("/user/follow/:id", (0, Auth_1.Auth)("User", response), userController_1.toggleFollow);
router.get("/user", (0, Auth_1.Auth)("User", response), userController_1.getUserByToken);
router.get("/user/friends", (0, Auth_1.Auth)("User", response), userController_1.getAllMyFriends);
router.get("/user/types", userController_1.getTypesUser);
router.get("/user/:id", (0, Auth_1.Auth)("User", response), userController_1.getUserByID);
router.put("/user/data", (0, Auth_1.Auth)("User", response), userController_1.updateData);
router.put("/user/avatar", (0, Auth_1.Auth)("User", response), userController_1.updateAvatar);
router.put("/user/header", (0, Auth_1.Auth)("User", response), userController_1.updateHeader);
router.put("/user/addGroup/:id", (0, Auth_1.Auth)("User", response), userController_1.addGroup);
router.put("/user/addFriend/:id", (0, Auth_1.Auth)("User", response), userController_1.addFriend);
router.delete("/user/deleteFriend/:id", (0, Auth_1.Auth)("User", response), userController_1.deleteFriend);
// Users request routes
router.post("/request/user/friend", (0, Auth_1.Auth)("User", response), RequestsController_1.sendRequestUserFriend);
router.get("/request/user/:id", (0, Auth_1.Auth)("User", response), RequestsController_1.getRequestUser);
router.delete("/request/user/:id", (0, Auth_1.Auth)("User", response), RequestsController_1.deleteRequestUser);
// Auth routes
router.post("/user/auth", (0, Validations_1.Validations)(User_1.userLoginValidation, response), userController_1.loginUser);
router.post("/user/auth/refreshToken", (0, Auth_1.Auth)("Admin", response), authController_1.refreshToken);
// Interest routes
router.get("/interest", interestController_1.getAllInterest);
// Tags routes
router.get("/tags", tagsController_1.getAllTags);
// Groups routes
router.post("/group", (0, Auth_1.Auth)("User", response), groupsController_1.createGroup);
router.get("/myGroups", (0, Auth_1.Auth)("User", response), groupsController_1.getAllMyGroups);
router.get("/group/:id", (0, Auth_1.Auth)("User", response), groupsController_1.getGroupById);
router.put("/group/picture/:id", (0, Auth_1.Auth)("User", response), groupsController_1.updatePictureGroup);
router.put("/group/header/:id", (0, Auth_1.Auth)("User", response), groupsController_1.updateHeaderGroup);
// Publications routes
router.get("/publication/:id", (0, Auth_1.Auth)("User", response), publicationsController_1.getPublicationByID);
router.post("/publication", (0, Auth_1.Auth)("User", response), publicationsController_1.createPublication);
router.get("/publications", (0, Auth_1.Auth)("User", response), publicationsController_1.getAllPublications);
router.post("/publication/reaction", (0, Auth_1.Auth)("User", response), publicationsController_1.addReactionOnPublication);
router.get("/publications/group/:groupID", (0, Auth_1.Auth)("User", response), publicationsController_1.getAllPublicationsFromGroupID);
router.get("/publications/:ownerID", (0, Auth_1.Auth)("User", response), publicationsController_1.getAllPublicationsFromUserID);
// Comments routes
router.post("/comment", (0, Auth_1.Auth)("User", response), commentsController_1.createCommentByID);
router.get("/comments/:idPost", (0, Auth_1.Auth)("User", response), commentsController_1.getAllCommentsByID);
router.use("/images", imagesRoutes_1.default);
exports.default = router;
