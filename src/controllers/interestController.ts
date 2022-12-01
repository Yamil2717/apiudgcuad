import { Request, Response } from "express";
import { Response as response } from "../lib/tools";
import InterestService from "../services/InterestService";
const resAPI = new response();

async function getAllInterest(req: Request, res: Response) {
  try {
    let interests: any = await InterestService.getAllInterest();
    console.info(`SOMEONE GOT THE LIST OF INTEREST`);
    resAPI.success(res, interests);
  } catch (error) {
    console.error((error as Error)?.message);
    return resAPI.error(res, (error as Error)?.message, 500);
  }
}

export { getAllInterest };
