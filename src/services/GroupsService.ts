import { Op, Sequelize } from "sequelize";
import { Groups } from "../models/Groups";
import env from "../utils/env";
import UserService from "./UserServices";

class groupsService {
  async createGroup(
    name: string,
    description: string,
    picture: string,
    ownerID: string
  ) {
    let group = await Groups.create({
      name,
      description,
      picture,
      membersIDS: [ownerID],
      membersCount: 1,
      ownerID,
      header: `${env.api.urlAPI}/images/group_banner/default.jpeg`,
    });
    return group;
  }

  async getGroupById(id: string) {
    let group: any = await Groups.findOne({ where: { id } });
    return group.get();
  }

  async getAllGroups() {
    let groups: any = await Groups.findAll();
    let groupsData: any = [];
    groups.map((group: any) => {
      groupsData.push(group.get());
    });
    if (groupsData.length <= 0)
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de grupo registrado."
      );
    return groupsData;
  }

  async getAllMyGroups(userID: string) {
    let user: any = await UserService.userGetById(userID);
    let { groups } = user;
    let groupsIDs: any = [];
    Object.keys(groups).map((key) => {
      groupsIDs.push({ id: key });
    });
    let groupsData: any = await Groups.findAll({
      attributes: {
        exclude: ["membersIDS"],
      },
      where: {
        [Op.or]: groupsIDs,
      },
    });
    let groupsDataReturn: any = [];
    groupsData.map((group: any) => {
      groupsDataReturn.push(group.get());
    });
    return groupsDataReturn;
  }

  async groupUpdatePicture(url: string, groupID: string, ownerID: string) {
    let group: any = await Groups.update(
      {
        picture: url,
      },
      {
        where: { id: groupID, ownerID },
        returning: true,
      }
    );
    if (group[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async groupUpdateHeader(url: string, groupID: string, ownerID: string) {
    let group: any = await Groups.update(
      {
        header: url,
      },
      {
        where: { id: groupID, ownerID },
        returning: true,
      }
    );
    if (group[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  async groupUpdateMembers(id: string, idUser: string, value: number) {
    let group: any = await Groups.findOne({ where: { id } });
    let { membersCount, membersIDS } = group.get();
    let newMembersIDS: any = [...membersIDS];
    newMembersIDS.push(idUser);
    let newMembersCount: number = membersCount;
    if (value > 0) {
      newMembersCount += value;
    } else {
      newMembersCount -= value;
    }
    let groupUpdate: any = await Groups.update(
      {
        membersCount: newMembersCount,
        membersIDS: newMembersIDS,
      },
      { where: { id } }
    );
    if (groupUpdate[0] === 1) {
      return true;
    } else {
      return false;
    }
  }
}

let GroupsService = new groupsService();

export default GroupsService;
