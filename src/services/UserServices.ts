import { User } from "../models/User";
import { Roles } from "../models/Roles";
import { Encrypt } from "../lib/tools";
import AuthService from "./AuthService";
import env from "../utils/env";

class userService {
  async userRegister(
    name: string,
    email: string,
    password: string,
    phone: string,
    postalCode: string,
    roleId: number,
    tagsIds: Array<number>,
    interestIds: Array<any>,
    location: object,
    dateBirth: Date,
    avatar: string
  ) {
    email = email.toLowerCase();
    let userExist: any = await User.findOne({ where: { email } });
    if (userExist) {
      throw new Error("El correo electrónico ya se encuentra registrado.");
    }
    let hashedPassword = await Encrypt.encryptPassword(password);
    let registerUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      postalCode,
      roleId,
      tagsIds,
      interestIds,
      avatar: avatar || `${env.api.urlAPI}/images/user/default.jpeg`,
      location,
      dateBirth,
      blocking: { enable: false },
    });
    if (!registerUser)
      throw new Error("Ha ocurrido un error y no sé pudo registrar la cuenta");
    return registerUser;
  }

  async userLogin(email: string, password: string) {
    email = email.toLowerCase();
    let userExist: any = await User.findOne({ where: { email } });
    if (!userExist) throw new Error("El correo no sé encuentra registrado.");
    let passwordMatch = await Encrypt.comparePassword(
      password,
      userExist.password
    );
    if (!passwordMatch)
      throw new Error("El correo o la contraseña no coinciden.");
    let token = AuthService.generateToken(
      userExist.id,
      userExist.name,
      userExist.email
    );
    return token;
  }

  async userTypes() {
    let userTypes: any = await Roles.findAll();
    userTypes.shift();
    let userTypesData: any = [];
    userTypes.map((type: any) => {
      let { id, name } = type.get();
      userTypesData.push({ label: name, value: id });
    });
    if (userTypesData <= 0) {
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de usuario registrado."
      );
    }
    return userTypesData;
  }

  async userGetById(id: any) {
    let user: any = await User.findOne({
      attributes: {
        exclude: ["password", "blocking", "updatedAt"],
      },
      where: { id },
      include: { model: Roles, required: true },
    });
    if (!user) {
      throw new Error("El id suministrado no coincide con ningún usuario.");
    }
    return user.get();
  }
}

let UserService = new userService();

export default UserService;
