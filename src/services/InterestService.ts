import { Interest } from '../models/Interest';


class interestService {

    async getAllInterest() {
        let interests: any = await Interest.findAll();
        let interestData = [];
        for (let interest in interests) {
            interestData.push({ ...interests[interest].dataValues });
        }
        if (interestData.length <= 0) throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de interés registrado.');
        return { data: interestData };
    }

}

let InterestService = new interestService;

export default InterestService;