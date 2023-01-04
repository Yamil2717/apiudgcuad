import { User } from "../models/User";
import { Roles } from "../models/Roles";
import { Encrypt } from "../lib/tools";
import AuthService from "./AuthService";
import env from "../utils/env";
import { Requests } from "../models/Requests";
import GroupsService from "./GroupsService";

class userService {
  async userRegister(
    name: string,
    email: string,
    password: string,
    countryIndicator: string,
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
      countryIndicator,
      phone,
      postalCode,
      roleId,
      tagsIds,
      interestIds,
      avatar: avatar || `${env.api.urlAPI}/images/user/default.jpeg`,
      header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
      location,
      groups: {
        "0e0a0784-58e8-47d3-939c-56959e36656c": "2022-11-28 00:45:12.427-05",
        "9b594b00-0307-4b5f-935d-e1e8023e918e": "2022-11-28 00:45:12.427-05",
        "07522151-449a-4eff-a8dd-c1d7f9a2823a": "2022-11-28 00:45:12.427-05",
        "b482fdae-4653-436b-bf66-56a2013b304a": "2022-11-28 00:45:12.427-05",
        "1b285ff4-a8fc-4763-a778-8503c9ccb805": "2022-11-28 00:45:12.427-05",
      },
      dateBirth,
      blocking: { enable: false },
    });

    try {
      await GroupsService.groupUpdateMembers(
        "0e0a0784-58e8-47d3-939c-56959e36656c",
        +1
      );
      await GroupsService.groupUpdateMembers(
        "9b594b00-0307-4b5f-935d-e1e8023e918e",
        +1
      );
      await GroupsService.groupUpdateMembers(
        "07522151-449a-4eff-a8dd-c1d7f9a2823a",
        +1
      );
      await GroupsService.groupUpdateMembers(
        "b482fdae-4653-436b-bf66-56a2013b304a",
        +1
      );
      await GroupsService.groupUpdateMembers(
        "1b285ff4-a8fc-4763-a778-8503c9ccb805",
        +1
      );
      console.info(
        "Se ha aumento la cantidad de miembros de los grupos por default exitosamente."
      );
    } catch (error) {
      console.log(error);
    }
    if (!registerUser)
      throw new Error("Ha ocurrido un error y no sé pudo registrar la cuenta");
    return registerUser;
  }

  async updateData(
    id: string,
    oldPassword: string,
    data: {
      name: string;
      email: string;
      password: string;
      countryIndicator: string;
      phone: string;
      postalCode: string;
      roleId: string;
    }
  ) {
    if (data?.email) {
      data.email = data.email.toLowerCase();
    }
    if (data?.password) {
      let userDB: any = await User.findOne({ where: { id } });
      let passwordOldCheck = await Encrypt.comparePassword(
        oldPassword,
        userDB.password
      );
      if (!passwordOldCheck) {
        throw new Error(
          "La antigua contraseña ingresada no coincide con la registrada en la DB."
        );
      }
      data.password = await Encrypt.encryptPassword(data.password);
    }
    let user: any = await User.update(
      { ...data },
      {
        where: { id },
      }
    );
    if (user[0] === 1) {
      let userData: any = await User.findOne({
        attributes: {
          exclude: ["password", "blocking", "updatedAt"],
        },
        where: { id },
        include: { model: Roles, required: true },
      });
      return userData.get();
    } else {
      throw new Error("No se pudo actualizar la información del usuario");
    }
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
    let userUpdate: any = await User.update(
      {
        follows: tempFollows,
      },
      {
        where: { id },
      }
    );
    if (userUpdate[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async addGroup(idGroup: string, id: string) {
    let user: any = await User.findOne({ where: { id } });
    let { groups } = user.get();
    if (!groups) {
      groups = {};
    }
    groups[idGroup] = new Date().toISOString();
    let userUpdate: any = await User.update(
      {
        groups,
      },
      {
        where: { id },
      }
    );
    if (userUpdate[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async addFriend(id: string, idTarget: string) {
    let userOne: any = await User.findOne({ where: { id } });
    let userTwo: any = await User.findOne({ where: { id: idTarget } });
    let date = new Date().toISOString();
    if (!userOne.friends[idTarget]) {
      userOne.friends[idTarget] = {
        dateAccepted: date,
        allowMessage: false,
      };
    }
    if (!userTwo.friends[id]) {
      userTwo.friends[id] = {
        dateAccepted: date,
        allowMessage: false,
      };
    }
    let userOneUpdate: any = await User.update(
      { friends: userOne.friends },
      { where: { id } }
    );
    let userTwoUpdate: any = await User.update(
      { friends: userTwo.friends },
      { where: { id: idTarget } }
    );
    if (userOneUpdate[0] === 1 && userTwoUpdate[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async deleteFriend(id: string, idTarget: string) {
    let userOne: any = await User.findOne({ where: { id } });
    let userTwo: any = await User.findOne({ where: { id: idTarget } });
    if (userOne.friends[idTarget]) {
      delete userOne.friends[idTarget];
    }
    if (userTwo.friends[id]) {
      delete userTwo.friends[id];
    }
    let userOneUpdate: any = await User.update(
      { friends: userOne.friends },
      { where: { id } }
    );
    let userTwoUpdate: any = await User.update(
      { friends: userTwo.friends },
      { where: { id: idTarget } }
    );
    let request: any = await Requests.destroy({
      where: { senderRequestID: id, receiverRequestID: idTarget },
    });
    if (!request) {
      await Requests.destroy({
        where: { senderRequestID: idTarget, receiverRequestID: id },
      });
    }
    if (userOneUpdate[0] === 1 && userTwoUpdate[0] === 1) {
      return true;
    } else {
      return false;
    }
  }
}

let UserService = new userService();

export default UserService;
