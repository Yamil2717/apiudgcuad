import { User } from "../models/User";
import { Roles } from "../models/Roles";
import { Encrypt } from "../lib/tools";
import AuthService from "./AuthService";

class userService {

    async userRegister(name: string, email: string, password: string, phone: string, postalCode: string, userType: number, tagsIds: Array<number>, interestIds: Array<any>, location: object, dateBirth: Date, avatar: string) {
        email = email.toLowerCase();
        let userExist: any = await User.findOne({ where: { email } });
        if (userExist) throw new Error('El correo electrónico ya se encuentra registrado.');
        let hashedPassword = await Encrypt.encryptPassword(password);
        let registerUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            postalCode,
            userType,
            tagsIds: JSON.stringify(tagsIds),
            interestIds: JSON.stringify(interestIds),
            avatar: avatar || 'http://https://habitandolametropoli.com/api/images/default.jpeg',
            //avatar: avatar || 'https://habitandolametropoli.com/api/images/default.jpeg',
            location: JSON.stringify(location),
            dateBirth,
            blocking: JSON.stringify({ enable: false })
        });
        if (!registerUser) throw new Error('Ha ocurrido un error y no sé pudo registrar la cuenta');
        return registerUser;
    }

    async userLogin(email: string, password: string) {
        email = email.toLowerCase();
        let userExist: any = await User.findOne({ where: { email } });
        if (!userExist) throw new Error('El correo no sé encuentra registrado.');
        let passwordMatch = await Encrypt.comparePassword(password, userExist.password);
        if (!passwordMatch) throw new Error('El correo o la contraseña no coinciden.');
        let token = AuthService.generateToken(userExist.id, userExist.name, userExist.email);
        return token;
    }

    async userTypes() {
        let userTypes: any = await Roles.findAll();
        let userTypesData = [];
        delete userTypes[0];
        for (let type in userTypes) {
            userTypesData.push({ label: userTypes[type].dataValues.name, value: userTypes[type].dataValues.id });
        }
        if (userTypesData.length <= 0) throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de usuario registrado.');
        return { data: userTypesData };
    }

    async userGetById(id: any) {
        let user: any = await User.findOne({ attributes: { exclude: ['password', 'blocking', 'updatedAt'] }, where: { id } });
        if (!user) throw new Error('El id suministrado no coincide con ningún usuario.');
        return { data: user }
    }
}

let UserService = new userService;

export default UserService;