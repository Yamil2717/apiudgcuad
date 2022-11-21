import { Request, Response } from 'express';
import { Response as response } from '../lib/tools';
import TagsService from '../services/TagsService';
const resAPI = new response();

async function getAllTags(req: Request, res: Response) {
    try {
        let tags: any = await TagsService.getAllTags()
        console.info(`SOMEONE GOT THE LIST OF TAGS`)
        resAPI.success(res, { message: 'Ha obtenido la lista de tags de forma correcta.', ...tags });
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}

export { getAllTags }