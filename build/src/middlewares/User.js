"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const yup_1 = require("yup");
exports.createUser = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required('Debe ingresar su nombre completo'),
        email: (0, yup_1.string)().email().required('Debe ingresar un correo electrónico.'),
        password: (0, yup_1.string)().min(8).required('Debe ingresar una contraseña de mínimo 8 dígitos.'),
        phone: (0, yup_1.string)().min(10).max(10).required('Debe ingresar un numero de teléfono válido.'),
        postalCode: (0, yup_1.string)().max(10).required('Debe ingresar su código postal'),
        roleId: (0, yup_1.number)().required('Debe ingresar un roleID'),
        tagsIds: (0, yup_1.array)().required('Debe seleccionar al menos un tag de un interés.'),
        interestIds: (0, yup_1.array)().required('Debe seleccionar al menos un interés'),
        location: (0, yup_1.string)().required('Ha ocurrido un error, no pudimos obtener su ubicación'),
        dateBirth: (0, yup_1.date)().required('Debe ingresar su fecha de nacimiento')
    })
});
