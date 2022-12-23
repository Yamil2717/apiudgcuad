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
} from "../controllers/userController";
import { createUserValidation, userLoginValidation } from "../Validations/User";
import { getAllInterest } from "../controllers/interestController";
import { Response } from "../lib/tools";
import { getAllTags } from "../controllers/tagsController";
import {
  createGroup,
  getAllGroups,
  getGroupById,
} from "../controllers/groupsController";
import {
  addReactionOnPublication,
  createPublication,
  getAllPublications,
  getAllPublicationsFromUserID,
} from "../controllers/publicationsController";
const path = require("node:path");
import {
  createCommentByID,
  getAllCommentsByID,
} from "../controllers/commentsController";
import imagesRoutes from "./imagesRoutes";
const response = new Response();
const router = Router();

// Users routes

router.post("/user", Validations(createUserValidation, response), createUser);
router.put("/user/follow/:id", Auth("User", response), toggleFollow);
router.get("/user", Auth("User", response), getUserByToken);
router.get("/user/types", getTypesUser);
router.get("/user/:id", Auth("User", response), getUserByID);
router.put("/user/avatar", Auth("User", response), updateAvatar);
router.put("/user/header", Auth("User", response), updateHeader);

// Auth routes
router.post(
  "/user/auth",
  Validations(userLoginValidation, response),
  loginUser
);
router.post("/user/auth/refreshToken", Auth("Admin", response), refreshToken);
router.get("/privacy-and-policy", (req: any, res: any) =>
  res.sendFile(path.join(__dirname, "../pages/privacyPolicy.html"))
);

// Interest routes

router.get("/interest", getAllInterest);

// Tags routes

router.get("/tags", getAllTags);

// Groups routes

router.post("/group", Auth("User", response), createGroup);
router.get("/group/:id", Auth("User", response), getGroupById);
router.get("/groups", Auth("User", response), getAllGroups);

// Publications routes

router.post("/publication", Auth("User", response), createPublication);
router.get("/publications", Auth("User", response), getAllPublications);
router.post(
  "/publication/reaction",
  Auth("User", response),
  addReactionOnPublication
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
