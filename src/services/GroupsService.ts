import { Groups } from "../models/Groups";

class groupsService {
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
