import { Router } from 'express';
import { Validations } from '../middlewares/Validations';
import { Auth } from '../middlewares/Auth';
import { refreshToken } from '../controllers/authController';
import { createUser, loginUser, getTypesUser, getUserById } from '../controllers/userController';
import { createUserValidation, userLoginValidation } from '../Validations/User';
import { getAllInterest } from '../controllers/interestController';
import { Response } from '../lib/tools';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { getAllTags } from '../controllers/tagsController';
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

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './imagesUpload');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${uuidv4()}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

let upload = multer({ storage: Storage, limits: { fileSize: 6291456 } })

router.post('/user/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return response.error(res, 'No se envió la fotografía');
    }
    console.log(`Se ha guardado en ${JSON.stringify(req.file.path)}`)
    response.success(res, {
        data: req.file.path
    });
});

export default router;
