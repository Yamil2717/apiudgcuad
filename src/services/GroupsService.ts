import { Groups } from '../models/Groups';


class groupsService {

    async getAllGroups() {
        let groups: any = await Groups.findAll();
        if (groups.length <= 0) throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de grupo registrado.');
        return { data: groups };
    }

}

let GroupsService = new groupsService;

export default GroupsService;