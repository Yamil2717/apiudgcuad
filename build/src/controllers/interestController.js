"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInterest = void 0;
const tools_1 = require("../lib/tools");
const InterestService_1 = __importDefault(require("../services/InterestService"));
const resAPI = new tools_1.Response();
async function getAllInterest(req, res) {
    try {
        let interests = await InterestService_1.default.getAllInterest();
        console.info(`SOMEONE GOT THE LIST OF INTEREST`);
        resAPI.success(res, { message: 'Ha obtenido la lista de intereses de forma correcta.', ...interests });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllInterest = getAllInterest;
