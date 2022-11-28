import { Router } from 'express';
import { Validations } from '../middlewares/Validations';
import { Auth } from '../middlewares/Auth';
import { refreshToken } from '../controllers/authController';
import { createUser, loginUser, getTypesUser, getUserById } from '../controllers/userController';
import { createUserValidation, userLoginValidation } from '../Validations/User';
import { getAllInterest } from '../controllers/interestController';
import { Response } from '../lib/tools';
import { getAllTags } from '../controllers/tagsController';
import { uploadUser, uploadGroups, uploadDist, getImage, uploadImage } from '../controllers/imagesController';
const path = require('node:path');

const response = new Response();
const router = Router();

/* Users routes */

router.post('/user', Validations(createUserValidation, response), createUser);
router.get('/user', Auth('User', response), getUserById);
router.get('/user/types', getTypesUser);

/* Auth routes */
router.post('/user/auth', Validations(userLoginValidation, response), loginUser);
router.post('/user/auth/refreshToken', Auth('Admin', response), refreshToken);
router.get('/privacy-and-policy', (req: any, res: any) => res.sendFile(path.join(__dirname, '../pages/privacyPolicy.html')))

/* Interest routes */

router.get('/interest', getAllInterest);

/* Tags routes */

router.get('/tags', getAllTags);

/* Images routes */

router.post('/images/user/upload', uploadUser.single('avatar'), uploadImage);
router.post('/images/group/upload', uploadGroups.single('picture'), uploadImage);
router.post('/images/dist/upload', uploadGroups.single('picture'), uploadImage);
router.post('/images/publication/upload', uploadGroups.array('pictures'), uploadImage);
router.get('/images/:type/:fileName', getImage);

export default router;
