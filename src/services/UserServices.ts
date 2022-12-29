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
      header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
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
      throw new Error("Debe volver a ingresar...");
    }
    return user.get();
  }

  async userUpdateAvatar(url: string, id: string) {
    let user: any = await User.update(
      {
        avatar: url,
      },
      {
        where: { id },
        returning: true,
      }
    );
    if (user[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async userUpdateHeader(url: string, id: string) {
    let user: any = await User.update(
      {
        header: url,
      },
      {
        where: { id },
        returning: true,
      }
    );
    if (user[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async toggleFollow(idTarget: string, id: string) {
    let user: any = await User.findOne({ where: { id } });
    let tempFollows = { ...user?.follows };
    if (tempFollows[idTarget]) {
      delete tempFollows[idTarget];
    } else {
      tempFollows[idTarget] = { date: Date.now() };
    }
    await User.update(
      {
        follows: tempFollows,
      },
      {
        where: { id },
      }
    );
    return true;
  }

  async addGroup(idGroup: string, id: string) {
    let user: any = await User.findOne({ where: { id } });
    let { groups } = user.get();
    groups[idGroup] = new Date().toISOString();
    await User.update(
      {
        groups,
      },
      {
        where: { id },
      }
    );
    return true;
  }
}

let UserService = new userService();

export default UserService;
