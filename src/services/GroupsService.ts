import { Groups } from "../models/Groups";

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
      idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
    });
    return group;
  }
  async getGroupById(id: string) {
    let group = await Groups.findOne({ where: { id } });
    return group?.get();
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
}

let GroupsService = new groupsService();

export default GroupsService;
