"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../utils/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    generateToken(uuid) {
        return jsonwebtoken_1.default.sign({ uuid }, env_1.default.api.accessSecret, { expiresIn: '1d' });
    }
}
/*class AuthService {
    private static authServiceInstance: AuthService;

    //private authRepository: Repository<Auth>;

    static async getInstance() {
        /*if (!AuthService.authServiceInstance) {
            AuthService.authServiceInstance = new AuthService();
            //AuthService.authServiceInstance.authRepository = getRepository(Auth);
        }
        return AuthService.authServiceInstance;
    }

    verifyToken(token: string) {
        ///return jwt.verify(token, env.api.secret);
    }

    generateToken(id: string, role: AuthRole): string {
        return JWT.sign({ id, role }, env.api.secret);
    }

    async userLogin(email: string, password: string) {
        const auth = await this.authRepository.findOne({
            where: {
                user: {
                    email,
                },
            },
            relations: ['user'],
        });
        if (!auth) {
            throw new Error('Credentials are not valid');
        }
        const isPasswordValid = await bcrypt.compare(password, auth.password);
        if (!isPasswordValid) {
            throw new Error('Credentials are not valid');
        }
        const token = this.generateToken(auth.user.uuid, 'user');
        return token;
    }

    async adminLogin(email: string, password: string) {
        /*const auth = await this.authRepository.findOne({
            where: {
                administrator: {
                    email,
                },
            },
            relations: ['administrator'],
        });
        if (!auth) {
            throw new Error('Credentials are not valid');
        }
        const isPasswordValid = await bcrypt.compare(password, auth.password);
        if (!isPasswordValid) {
            throw new Error('Credentials are not valid');
        }
        const token = this.generateToken(auth.administrator.id.toString(), 'administrator');
        return token;
    }
}

export default AuthService;*/
exports.default = AuthService;
