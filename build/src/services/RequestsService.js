"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Requests_1 = require("../models/Requests");
class requestsService {
    async sendRequestUser(ownerID, userID, type) {
        let requestCheck = await Requests_1.Requests.findOne({
            where: { senderRequestID: ownerID, receiverRequestID: userID },
        });
        if (requestCheck) {
            throw new Error("Ya has enviado esa solicitud.");
        }
        let requestCheckReversed = await Requests_1.Requests.findOne({
            where: { senderRequestID: userID, receiverRequestID: ownerID },
        });
        if (requestCheckReversed) {
            throw new Error("Ese usuario ya te ha enviado esa solicitud.");
        }
        let request = await Requests_1.Requests.create({
            senderRequestID: ownerID,
            receiverRequestID: userID,
            action: type,
        });
        if (!request) {
            throw new Error("Ha ocurrido un error, no se pudo enviar la solicitud, vuelva a intentarlo.");
        }
        return request.get();
    }
    async getRequestUser(ownerID, userID) {
        let request = await Requests_1.Requests.findOne({
            where: { senderRequestID: ownerID, receiverRequestID: userID },
        });
        if (!request) {
            let requestReversed = await Requests_1.Requests.findOne({
                where: { senderRequestID: userID, receiverRequestID: ownerID },
            });
            if (!requestReversed) {
                throw new Error("No existe ninguna solicitud.");
            }
            else {
                return { type: 2 };
            }
        }
        return { type: 1 };
    }
    async deleteRequestUser(ownerID, userID) {
        let request = await Requests_1.Requests.destroy({
            where: {
                senderRequestID: ownerID,
                receiverRequestID: userID,
            },
        });
        let requestReversed = await Requests_1.Requests.destroy({
            where: { senderRequestID: userID, receiverRequestID: ownerID },
        });
        if (!request && !requestReversed) {
            throw new Error("No se pudo eliminar la solicitud, vuelva a intentarlo por favor.");
        }
        return true;
    }
}
let RequestsService = new requestsService();
exports.default = RequestsService;
