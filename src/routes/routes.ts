import { Router } from "express";
import { Validations } from "../middlewares/Validations";
import { Auth } from "../middlewares/Auth";
import { refreshToken } from "../controllers/authController";
import {
  createUser,
  loginUser,
  getTypesUser,
  getUserByID,
  getUserByToken,
  updateAvatar,
  updateHeader,
  toggleFollow,
  addGroup,
  addFriend,
  deleteFriend,
  updateData,
  getAllMyFriends,
  searchUserByPartialName,
} from "../controllers/userController";
import { createUserValidation, userLoginValidation } from "../Validations/User";
import { getAllInterest } from "../controllers/interestController";
import { Response } from "../lib/tools";
import { getAllTags } from "../controllers/tagsController";
import {
  createGroup,
  getAllMyGroups,
  getGroupById,
  updatePictureGroup,
  updateHeaderGroup,
  searchGroupsByPartialName,
} from "../controllers/groupsController";
import {
  addReactionOnPublication,
  createPublication,
  getAllPublications,
  getAllPublicationsFromGroupID,
  getAllPublicationsFromUserID,
  getPublicationByID,
} from "../controllers/publicationsController";
const path = require("node:path");
import {
  createCommentByID,
  getAllCommentsByID,
} from "../controllers/commentsController";
import imagesRoutes from "./imagesRoutes";
import {
  sendRequestUserFriend,
  getRequestUser,
  deleteRequestUser,
} from "../controllers/RequestsController";
const response = new Response();
const router = Router();

// Users routes

router.post("/user/search", Auth("User", response), searchUserByPartialName);
router.post("/user", Validations(createUserValidation, response), createUser);
router.put("/user/follow/:id", Auth("User", response), toggleFollow);
router.get("/user", Auth("User", response), getUserByToken);
router.get("/user/friends", Auth("User", response), getAllMyFriends);
router.get("/user/types", getTypesUser);
router.get("/user/:id", Auth("User", response), getUserByID);
router.put("/user/data", Auth("User", response), updateData);
router.put("/user/avatar", Auth("User", response), updateAvatar);
router.put("/user/header", Auth("User", response), updateHeader);
router.put("/user/addGroup/:id", Auth("User", response), addGroup);
router.put("/user/addFriend/:id", Auth("User", response), addFriend);
router.delete("/user/deleteFriend/:id", Auth("User", response), deleteFriend);

// Users request routes

router.post(
  "/request/user/friend",
  Auth("User", response),
  sendRequestUserFriend
);
router.get("/request/user/:id", Auth("User", response), getRequestUser);
router.delete("/request/user/:id", Auth("User", response), deleteRequestUser);
// Auth routes

router.post(
  "/user/auth",
  Validations(userLoginValidation, response),
  loginUser
);
router.post("/user/auth/refreshToken", Auth("Admin", response), refreshToken);

// Interest routes

router.get("/interest", getAllInterest);

// Tags routes

router.get("/tags", getAllTags);

// Groups routes

router.post("/group", Auth("User", response), createGroup);
router.get("/myGroups", Auth("User", response), getAllMyGroups);
router.get("/group/:id", Auth("User", response), getGroupById);
router.put("/group/picture/:id", Auth("User", response), updatePictureGroup);
router.put("/group/header/:id", Auth("User", response), updateHeaderGroup);
router.post(
  "/groups/search",
  Auth("User", response),
  searchGroupsByPartialName
);

// Publications routes

router.get("/publication/:id", Auth("User", response), getPublicationByID);
router.post("/publication", Auth("User", response), createPublication);
router.get("/publications", Auth("User", response), getAllPublications);
router.post(
  "/publication/reaction",
  Auth("User", response),
  addReactionOnPublication
);
router.get(
  "/publications/group/:groupID",
  Auth("User", response),
  getAllPublicationsFromGroupID
);
router.get(
  "/publications/:ownerID",
  Auth("User", response),
  getAllPublicationsFromUserID
);

// Comments routes

router.post("/comment", Auth("User", response), createCommentByID);
router.get("/comments/:idPost", Auth("User", response), getAllCommentsByID);

router.use("/images", imagesRoutes);

export default router;
