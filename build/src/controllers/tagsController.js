"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTags = void 0;
const tools_1 = require("../lib/tools");
const TagsService_1 = __importDefault(require("../services/TagsService"));
const resAPI = new tools_1.Response();
async function getAllTags(req, res) {
    try {
        let tags = await TagsService_1.default.getAllTags();
        console.info(`SOMEONE GOT THE LIST OF TAGS`);
        resAPI.success(res, { message: 'Ha obtenido la lista de tags de forma correcta.', ...tags });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getAllTags = getAllTags;
