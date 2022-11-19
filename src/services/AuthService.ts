
import env from '../utils/env';
import JWT from 'jsonwebtoken';

export type AuthRole = 'administrator' | 'user';

class authService {

    generateToken(id: string, name: string, email: string) {
        const user = { id, name, email };
        const accessToken = JWT.sign(user, env.api.accessSecret, { expiresIn: '1d' });
        const refreshToken = JWT.sign(user, env.api.refreshSecret, { expiresIn: '14d' });
        return { accessToken, refreshToken };
    }

    verifyToken(token: string) {
        return JWT.verify(token, env.api.accessSecret);
    }

    refreshToken(token: string) {

    }

}

let AuthService = new authService;

export default AuthService;
