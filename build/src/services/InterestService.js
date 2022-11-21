"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interest_1 = require("../models/Interest");
class interestService {
    async getAllInterest() {
        let interests = await Interest_1.Interest.findAll();
        let interestData = [];
        for (let interest in interests) {
            interestData.push({ ...interests[interest].dataValues });
        }
        if (interestData.length <= 0)
            throw new Error('Ha ocurrido un error, no se encuentra ningún tipo de interés registrado.');
        return { data: interestData };
    }
}
let InterestService = new interestService;
exports.default = InterestService;
