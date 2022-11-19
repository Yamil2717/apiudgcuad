"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validations = void 0;
const Validations = (schema, response) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
        });
        return next();
    }
    catch (error) {
        response.error(res, error?.message, 400);
    }
};
exports.Validations = Validations;
