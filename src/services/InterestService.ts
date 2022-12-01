import { Interest } from "../models/Interest";

class interestService {
  async getAllInterest() {
    let interests: any = await Interest.findAll();
    let interestData: any = [];
    interests.map((interest: any) => {
      interestData.push(interest.get());
    });
    if (interestData.length <= 0)
      throw new Error(
        "Ha ocurrido un error, no se encuentra ningún tipo de interés registrado."
      );
    return interestData;
  }
}

let InterestService = new interestService();

export default InterestService;
