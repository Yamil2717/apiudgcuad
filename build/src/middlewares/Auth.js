"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const Auth = (role, response, includeData = false) => async (req, res, next) => {
    try {
        let { authorization } = req.headers;
        if (!authorization)
            return response.error(res, 'No autorizado.', 401);
        let token = authorization.split(' ')[1];
        if (!token)
            return response.error(res, 'No autorizado', 401);
        return next();
    }
    catch (error) {
        console.error(error);
        return response.error(res, 'No autorizado.', 401);
    }
};
exports.Auth = Auth;
