import { User } from "../models/User";
import { Encrypt } from "../lib/tools";
import AuthService from "./AuthService";

class userService {

    async userRegister(name: string, email: string, password: string, phone: string, postalCode: string, userType: number, tagsIds: Array<number>, interestIds: Array<any>, location: object, dateBirth: Date) {
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
            avatar: 'https://img.freepik.com/vector-premium/caracter-chico-avatar-internet_24877-17032.jpg',
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

}

let UserService = new userService;

export default UserService;