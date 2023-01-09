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
const Requests_1 = require("../models/Requests");
const GroupsService_1 = __importDefault(require("./GroupsService"));
const sequelize_1 = require("sequelize");
class userService {
    async userRegister(name, email, password, countryIndicator, phone, postalCode, roleId, tagsIds, interestIds, location, dateBirth, avatar) {
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
            countryIndicator,
            phone,
            postalCode,
            roleId,
            tagsIds,
            interestIds,
            avatar: avatar || `${env_1.default.api.urlAPI}/images/user/default.jpeg`,
            header: `${env_1.default.api.urlAPI}/images/profile_banner/default.jpeg`,
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
            await GroupsService_1.default.groupUpdateMembers("0e0a0784-58e8-47d3-939c-56959e36656c", +1);
            await GroupsService_1.default.groupUpdateMembers("9b594b00-0307-4b5f-935d-e1e8023e918e", +1);
            await GroupsService_1.default.groupUpdateMembers("07522151-449a-4eff-a8dd-c1d7f9a2823a", +1);
            await GroupsService_1.default.groupUpdateMembers("b482fdae-4653-436b-bf66-56a2013b304a", +1);
            await GroupsService_1.default.groupUpdateMembers("1b285ff4-a8fc-4763-a778-8503c9ccb805", +1);
            console.info("Se ha aumento la cantidad de miembros de los grupos por default exitosamente.");
        }
        catch (error) {
            console.log(error);
        }
        if (!registerUser)
            throw new Error("Ha ocurrido un error y no sé pudo registrar la cuenta");
        return registerUser;
    }
    async updateData(id, oldPassword, data) {
        if (data?.email) {
            data.email = data.email.toLowerCase();
        }
        if (data?.password) {
            let userDB = await User_1.User.findOne({ where: { id } });
            let passwordOldCheck = await tools_1.Encrypt.comparePassword(oldPassword, userDB.password);
            if (!passwordOldCheck) {
                throw new Error("La antigua contraseña ingresada no coincide con la registrada en la DB.");
            }
            data.password = await tools_1.Encrypt.encryptPassword(data.password);
        }
        let user = await User_1.User.update({ ...data }, {
            where: { id },
        });
        if (user[0] === 1) {
            let userData = await User_1.User.findOne({
                attributes: {
                    exclude: ["password", "blocking", "updatedAt"],
                },
                where: { id },
                include: { model: Roles_1.Roles, required: true },
            });
            return userData.get();
        }
        else {
            throw new Error("No se pudo actualizar la información del usuario");
        }
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
            include: { model: Roles_1.Roles, required: true },
        });
        if (!user) {
            throw new Error("Debe volver a ingresar...");
        }
        return user.get();
    }
    async userUpdateAvatar(url, id) {
        let user = await User_1.User.update({
            avatar: url,
        }, {
            where: { id },
            returning: true,
        });
        if (user[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async userUpdateHeader(url, id) {
        let user = await User_1.User.update({
            header: url,
        }, {
            where: { id },
            returning: true,
        });
        if (user[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async toggleFollow(idTarget, id) {
        let user = await User_1.User.findOne({ where: { id } });
        let tempFollows = { ...user?.follows };
        if (tempFollows[idTarget]) {
            delete tempFollows[idTarget];
        }
        else {
            tempFollows[idTarget] = { date: Date.now() };
        }
        let userUpdate = await User_1.User.update({
            follows: tempFollows,
        }, {
            where: { id },
        });
        if (userUpdate[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async addGroup(idGroup, id) {
        let user = await User_1.User.findOne({ where: { id } });
        let { groups } = user.get();
        if (!groups) {
            groups = {};
        }
        groups[idGroup] = new Date().toISOString();
        let userUpdate = await User_1.User.update({
            groups,
        }, {
            where: { id },
        });
        if (userUpdate[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async addFriend(id, idTarget) {
        let userOne = await User_1.User.findOne({ where: { id } });
        let userTwo = await User_1.User.findOne({ where: { id: idTarget } });
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
        let userOneUpdate = await User_1.User.update({ friends: userOne.friends }, { where: { id } });
        let userTwoUpdate = await User_1.User.update({ friends: userTwo.friends }, { where: { id: idTarget } });
        if (userOneUpdate[0] === 1 && userTwoUpdate[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async deleteFriend(id, idTarget) {
        let userOne = await User_1.User.findOne({ where: { id } });
        let userTwo = await User_1.User.findOne({ where: { id: idTarget } });
        if (userOne.friends[idTarget]) {
            delete userOne.friends[idTarget];
        }
        if (userTwo.friends[id]) {
            delete userTwo.friends[id];
        }
        let userOneUpdate = await User_1.User.update({ friends: userOne.friends }, { where: { id } });
        let userTwoUpdate = await User_1.User.update({ friends: userTwo.friends }, { where: { id: idTarget } });
        let request = await Requests_1.Requests.destroy({
            where: { senderRequestID: id, receiverRequestID: idTarget },
        });
        if (!request) {
            await Requests_1.Requests.destroy({
                where: { senderRequestID: idTarget, receiverRequestID: id },
            });
        }
        if (userOneUpdate[0] === 1 && userTwoUpdate[0] === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async getAllMyFriends(userID) {
        let user = await UserService.userGetById(userID);
        let { friends } = user;
        let friendsIDs = [];
        Object.keys(friends).map((key) => {
            friendsIDs.push({ id: key });
        });
        let friendsData = await User_1.User.findAll({
            attributes: ["id", "avatar", "name"],
            where: {
                [sequelize_1.Op.or]: friendsIDs,
            },
        });
        let friendsDataReturn = [];
        friendsData.map((friend) => {
            friendsDataReturn.push(friend.get());
        });
        return friendsDataReturn;
    }
}
let UserService = new userService();
exports.default = UserService;
