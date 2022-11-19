"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = exports.Response = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Response {
    success(res, data, statusCode = 200) {
        res.status(statusCode).send({ ...data });
    }
    error(res, message, statusCode = 500) {
        res.status(statusCode).send({ error: true, message });
    }
}
exports.Response = Response;
class encrypt {
    async encryptPassword(password) {
        let hashedPassword = await bcryptjs_1.default.hash(password, 10);
        return hashedPassword;
    }
    async comparePassword(password, dbPassword) {
        let same = await bcryptjs_1.default.compare(password, dbPassword);
        return same;
    }
}
let Encrypt = new encrypt;
exports.Encrypt = Encrypt;
