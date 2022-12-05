"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Roles_1 = require("../models/Roles");
const tools_1 = require("../lib/tools");
const AuthService_1 = __importDefault(require("./AuthService"));
const env_1 = __importDefault(require("../utils/env"));
class userService {
    async userRegister(name, email, password, phone, postalCode, userType, tagsIds, interestIds, location, dateBirth, avatar) {
        email = email.toLowerCase();
        let userExist = await User_1.User.findOne({ where: { email } });
        if (userExist) {
            throw new Error("El correo electrónico ya se encuentra registrado.");
        }
        let hashedPassword = await tools_1.Encrypt.encryptPassword(password);
        let registerUser = await User_1.User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            postalCode,
            userType,
            tagsIds: tagsIds,
            interestIds: interestIds,
            avatar: avatar || `${env_1.default.api.urlAPI}/images/user/default.jpeg`,
            location: location,
            dateBirth,
            blocking: { enable: false },
        });
        if (!registerUser)
            throw new Error("Ha ocurrido un error y no sé pudo registrar la cuenta");
        return registerUser;
    }
    async userLogin(email, password) {
        email = email.toLowerCase();
        let userExist = await User_1.User.findOne({ where: { email } });
        if (!userExist)
            throw new Error("El correo no sé encuentra registrado.");
        let passwordMatch = await tools_1.Encrypt.comparePassword(password, userExist.password);
        if (!passwordMatch)
            throw new Error("El correo o la contraseña no coinciden.");
        let token = AuthService_1.default.generateToken(userExist.id, userExist.name, userExist.email);
        return token;
    }
    async userTypes() {
        let userTypes = await Roles_1.Roles.findAll();
        userTypes.shift();
        let userTypesData = [];
        userTypes.map((type) => {
            let { id, name } = type.get();
            userTypesData.push({ label: name, value: id });
        });
        if (userTypesData <= 0) {
            throw new Error("Ha ocurrido un error, no se encuentra ningún tipo de usuario registrado.");
        }
        return userTypesData;
    }
    async userGetById(id) {
        let user = await User_1.User.findOne({
            attributes: {
                exclude: ["password", "blocking", "updatedAt"],
            },
            where: { id },
        });
        if (!user) {
            throw new Error("El id suministrado no coincide con ningún usuario.");
        }
        let rol = await Roles_1.Roles.findOne({ where: { id: user?.roleId } });
        return { ...user.get(), role: rol.get() };
    }
}
let UserService = new userService();
exports.default = UserService;
