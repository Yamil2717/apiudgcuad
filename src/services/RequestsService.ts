import { Requests } from "../models/Requests";

class requestsService {
  async sendRequestUser(ownerID: string, userID: string, type: number) {
    let requestCheck: any = await Requests.findOne({
      where: { senderRequestID: ownerID, receiverRequestID: userID },
    });
    if (requestCheck) {
      throw new Error("Ya has enviado esa solicitud.");
    }
    let requestCheckReversed: any = await Requests.findOne({
      where: { senderRequestID: userID, receiverRequestID: ownerID },
    });
    if (requestCheckReversed) {
      throw new Error("Ese usuario ya te ha enviado esa solicitud.");
    }
    let request: any = await Requests.create({
      senderRequestID: ownerID,
      receiverRequestID: userID,
      action: type,
    });
    if (!request) {
      throw new Error(
        "Ha ocurrido un error, no se pudo enviar la solicitud, vuelva a intentarlo."
      );
    }
    return request.get();
  }

  async getRequestUser(ownerID: string, userID: string) {
    let request: any = await Requests.findOne({
      where: { senderRequestID: ownerID, receiverRequestID: userID },
    });
    if (!request) {
      let requestReversed: any = await Requests.findOne({
        where: { senderRequestID: userID, receiverRequestID: ownerID },
      });
      if (!requestReversed) {
        throw new Error("No existe ninguna solicitud.");
      } else {
        return { type: 2 };
      }
    }
    return { type: 1 };
  }

  async deleteRequestUser(ownerID: string, userID: string) {
    let request: any = await Requests.destroy({
      where: {
        senderRequestID: ownerID,
        receiverRequestID: userID,
      },
    });
    let requestReversed: any = await Requests.destroy({
      where: { senderRequestID: userID, receiverRequestID: ownerID },
    });
    if (!request && !requestReversed) {
      throw new Error(
        "No se pudo eliminar la solicitud, vuelva a intentarlo por favor."
      );
    }
    return true;
  }
}

let RequestsService = new requestsService();

export default RequestsService;
