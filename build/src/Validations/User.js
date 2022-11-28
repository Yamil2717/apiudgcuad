"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = exports.createUserValidation = void 0;
const yup_1 = require("yup");
exports.createUserValidation = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required('Debe ingresar su nombre completo').typeError('Debe ingresar un nombre completo'),
        email: (0, yup_1.string)().email().required('Debe ingresar un correo electrónico.').typeError('Debe ingresar un correo electrónico.'),
        password: (0, yup_1.string)().min(8).required('Debe ingresar una contraseña de mínimo 8 dígitos.').typeError('Debe ingresar una contraseña de mínimo 8 dígitos.'),
        rePassword: (0, yup_1.string)().oneOf([(0, yup_1.ref)('password'), null], 'Las contraseñas no coinciden.').required('Debe ingresar la confirmación de la contraseña'),
        phone: (0, yup_1.string)().min(10).max(10).required('Debe ingresar un numero de teléfono válido.').typeError('Debe ingresar un numero de teléfono válido.'),
        postalCode: (0, yup_1.string)().max(10).required('Debe ingresar su código postal').typeError('Debe ingresar su código postal'),
        userType: (0, yup_1.number)().required('Debe ingresar un tipo de usuario.').typeError('Debe ingresar un tipo de usuario'),
        tagsIds: (0, yup_1.array)().required('Debe seleccionar al menos un tag de un interés.').typeError('Debe seleccionar al menos un tag de un interés.'),
        interestIds: (0, yup_1.array)().required('Debe seleccionar al menos un interés').typeError('Debe seleccionar al menos un interés'),
        location: (0, yup_1.object)().required('Ha ocurrido un error, no pudimos obtener su ubicación').typeError('Ha ocurrido un error, no pudimos obtener su ubicación'),
        dateBirth: (0, yup_1.date)().required('Debe ingresar su fecha de nacimiento').typeError('Debe ingresar su fecha de nacimiento'),
        avatar: (0, yup_1.string)().typeError('La fotografía no es válida.')
    })
});
exports.userLoginValidation = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().email().required('Debe ingresar un correo electrónico.').typeError('Debe ingresar un correo electrónico.'),
        password: (0, yup_1.string)().min(8).required('Debe ingresar una contraseña válida.').typeError('Debe ingresar una contraseña válida.'),
    })
});
