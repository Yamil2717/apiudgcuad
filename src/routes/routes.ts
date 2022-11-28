import { Router } from 'express';
import { Validations } from '../middlewares/Validations';
import { Auth } from '../middlewares/Auth';
import { refreshToken } from '../controllers/authController';
import { createUser, loginUser, getTypesUser, getUserById } from '../controllers/userController';
import { createUserValidation, userLoginValidation } from '../Validations/User';
import { getAllInterest } from '../controllers/interestController';
import { Response } from '../lib/tools';
import { getAllTags } from '../controllers/tagsController';
import { uploadUser, uploadGroups, uploadDist, getImage, uploadImage, uploadImagePublications, uploadPublications } from '../controllers/imagesController';
import { getAllGroups } from '../controllers/groupsController';
import { createPublication, getAllPublications } from '../controllers/publicationsController';
const path = require('node:path');
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
const response = new Response();
const router = Router();

// Users routes

router.post('/user', Validations(createUserValidation, response), createUser);
router.get('/user', Auth('User', response), getUserById);
router.get('/user/types', getTypesUser);

// Auth routes
router.post('/user/auth', Validations(userLoginValidation, response), loginUser);
router.post('/user/auth/refreshToken', Auth('Admin', response), refreshToken);
router.get('/privacy-and-policy', (req: any, res: any) => res.sendFile(path.join(__dirname, '../pages/privacyPolicy.html')))

// Interest routes

router.get('/interest', getAllInterest);

// Tags routes

router.get('/tags', getAllTags);

// Groups routes

router.get('/groups', Auth('User', response), getAllGroups);

// Publications routes

router.post('/publication', Auth('User', response), createPublication);
router.get('/publications', Auth('User', response), getAllPublications);

// Images routes

const StoragePublications = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload/publications');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${uuidv4()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});



router.post('/images/user/upload', uploadUser.single('avatar'), uploadImage);
router.post('/images/group/upload', uploadGroups.single('picture'), uploadImage);
router.post('/images/dist/upload', uploadDist.single('picture'), uploadImage);
router.post('/images/publication/upload', uploadPublications.single('picture'), uploadImagePublications);
router.get('/images/:type/:fileName', getImage);

export default router;
