import { Router } from 'express';
import { Validations } from '../middlewares/Validations';
import { Auth } from '../middlewares/Auth';
import { refreshToken } from '../controllers/authController';
import { createUser, loginUser } from '../controllers/userController';
import { createUserValidation, userLoginValidation } from '../Validations/User';
import { Response } from '../lib/tools';
const path = require('node:path');

const response = new Response();
const router = Router();

/* Users routes */

router.post('/user', Validations(createUserValidation, response), createUser);
router.post('/user/auth', Validations(userLoginValidation, response), loginUser);

/* End user routes */

/* Auth routes */

router.post('/user/auth/refreshToken', Auth('Admin', response), refreshToken);
router.get('/privacy-and-policy', (req: any, res: any) => res.sendFile(path.join(__dirname, '../pages/privacyPolicy.html')))

/* End auth routes */

export default router;
