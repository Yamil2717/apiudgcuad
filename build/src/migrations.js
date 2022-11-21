"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roles_1 = require("./models/Roles");
const Interest_1 = require("./models/Interest");
const Tag_1 = require("./models/Tag");
async function migrations() {
    await Roles_1.Roles.bulkCreate([
        { name: 'Admin' },
        { name: 'Empresario' },
        { name: 'Desarrollador' },
        { name: 'Funcionario público' },
        { name: 'Vendedor' },
        { name: 'Usuario vivienda' },
        { name: 'Académicos' },
        { name: 'Organizaciones Civiles' },
        { name: 'Financieros de Vivienda' },
    ], {
        ignoreDuplicates: true,
    })
        .then(() => console.info("Se ha insertado la información de user types correctamente."))
        .catch(err => console.error("Ha ocurrido un error a la hora de insertar la información de user types. Error: " + err));
    await Interest_1.Interest.bulkCreate([
        { name: 'Transporte público', picture: 'https://live.staticflickr.com/3071/2758112598_94ddb62203_b.jpg' },
        { name: 'Vivienda deshabitada', picture: 'https://www.capitalmexico.com.mx/wp-content/uploads/2019/04/Foto-Especial-29-2.jpg' },
        { name: 'Gestión Urbana', picture: 'https://www.alcaldesdemexico.com/wp-content/uploads/2020/06/Gestion_urbana.jpg' },
        { name: 'Producción de Vivienda', picture: 'https://www.rrhhdigital.com/userfiles/construccion-obreros-obra.jpg' },
        { name: 'Inseguridad vial', picture: 'https://www.serviasistenciaexpress.com/wp-content/uploads/2018/07/Seguridad-Vial.jpg' },
        { name: 'Obras viales', picture: 'https://www.diariodexalapa.com.mx/incoming/8z3257-obras-xalapa.jpg/ALTERNATES/LANDSCAPE_768/Obras%20Xalapa.jpg' },
        { name: 'Vivienda y trabajo', picture: 'https://images.adsttc.com/media/images/5d72/b905/284d/d10d/8700/0033/newsletter/17_%C2%A9_Iwan_Baan.jpg' },
    ], {
        ignoreDuplicates: true,
    })
        .then(() => console.info("Se ha insertado la información de intereses correctamente."))
        .catch(err => console.error("Ha ocurrido un error a la hora de insertar la información de intereses. Error: " + err));
    await Tag_1.Tags.bulkCreate([
        /* Transporte público */
        { hashtag: 'via', idCategory: 1 },
        { hashtag: 'movilidad', idCategory: 1 },
        { hashtag: 'carretera', idCategory: 1 },
        { hashtag: 'avenida', idCategory: 1 },
        { hashtag: 'calle', idCategory: 1 },
        { hashtag: 'buseta', idCategory: 1 },
        { hashtag: 'taxis', idCategory: 1 },
        { hashtag: 'rutas', idCategory: 1 },
        { hashtag: 'paradas_buses', idCategory: 1 },
        { hashtag: 'destino', idCategory: 1 },
        { hashtag: 'terminal', idCategory: 1 },
        { hashtag: 'pasajeros', idCategory: 1 },
        /* Vivienda deshabitada */
        { hashtag: 'residentes', idCategory: 2 },
        { hashtag: 'inmueble', idCategory: 2 },
        { hashtag: 'ausentado', idCategory: 2 },
        { hashtag: 'residencia', idCategory: 2 },
        { hashtag: 'contaminación', idCategory: 2 },
        { hashtag: 'periódica', idCategory: 2 },
        { hashtag: 'desocupada', idCategory: 2 },
        { hashtag: 'póliza', idCategory: 2 },
        { hashtag: 'incómodos', idCategory: 2 },
        { hashtag: 'existentes', idCategory: 2 },
        { hashtag: 'análisis', idCategory: 2 },
        /* Gestión Urbana */
        { hashtag: 'casa', idCategory: 3 },
        { hashtag: 'apartamento', idCategory: 3 },
        { hashtag: 'propia', idCategory: 3 },
        { hashtag: 'proyecto', idCategory: 3 },
        { hashtag: 'análisis', idCategory: 3 },
        { hashtag: 'urbanismo', idCategory: 3 },
        { hashtag: 'ciudadana', idCategory: 3 },
        { hashtag: 'auditoría', idCategory: 3 },
        { hashtag: 'módulo', idCategory: 3 },
        { hashtag: 'climático', idCategory: 3 },
        { hashtag: 'coordinación', idCategory: 3 },
        /* Producción de Vivienda */
        { hashtag: 'urbano', idCategory: 4 },
        { hashtag: 'habitacional', idCategory: 4 },
        { hashtag: 'innovación', idCategory: 4 },
        { hashtag: 'crecimiento', idCategory: 4 },
        { hashtag: 'modelo', idCategory: 4 },
        { hashtag: 'producción', idCategory: 4 },
        { hashtag: 'vivienda', idCategory: 4 },
        { hashtag: 'sociedad', idCategory: 4 },
        { hashtag: 'social', idCategory: 4 },
        { hashtag: 'hipotecaria', idCategory: 4 },
        { hashtag: 'económico', idCategory: 4 },
        { hashtag: 'censo', idCategory: 4 },
        /* Inseguridad vial */
        { hashtag: 'accesibilidad', idCategory: 5 },
        { hashtag: 'política', idCategory: 5 },
        { hashtag: 'sencilla', idCategory: 5 },
        { hashtag: 'accidentes', idCategory: 5 },
        { hashtag: 'disminuir', idCategory: 5 },
        { hashtag: 'prevención', idCategory: 5 },
        { hashtag: 'muertos', idCategory: 5 },
        { hashtag: 'choques', idCategory: 5 },
        { hashtag: 'controlar', idCategory: 5 },
        { hashtag: 'consecuencia', idCategory: 5 },
        { hashtag: 'heridos', idCategory: 5 },
        { hashtag: 'funcionamiento', idCategory: 5 },
        /* Obras viales */
        { hashtag: 'construcción', idCategory: 6 },
        { hashtag: 'rehabilitación', idCategory: 6 },
        { hashtag: 'adecuación', idCategory: 6 },
        { hashtag: 'mejoramiento', idCategory: 6 },
        { hashtag: 'mantenimiento', idCategory: 6 },
        { hashtag: 'tráfico', idCategory: 6 },
        { hashtag: 'vehicular', idCategory: 6 },
        { hashtag: 'vías', idCategory: 6 },
        { hashtag: 'urbanas', idCategory: 6 },
        { hashtag: 'carreteras', idCategory: 6 },
        { hashtag: 'infraestructura', idCategory: 6 },
        { hashtag: 'demolición', idCategory: 6 },
        /* Vivienda y trabajo */
        { hashtag: 'casa', idCategory: 7 },
        { hashtag: 'autonomía', idCategory: 7 },
        { hashtag: 'habitacional', idCategory: 7 },
        { hashtag: 'trayectorias', idCategory: 7 },
        { hashtag: 'mudarse', idCategory: 7 },
        { hashtag: 'laboral', idCategory: 7 },
        { hashtag: 'familias', idCategory: 7 },
        { hashtag: 'vacantes', idCategory: 7 },
        { hashtag: 'subsidio ', idCategory: 7 },
        { hashtag: 'administren', idCategory: 7 },
        { hashtag: 'beneficiario', idCategory: 7 },
        { hashtag: 'empleo', idCategory: 7 },
    ], {
        ignoreDuplicates: true,
    })
        .then(() => console.info("Se ha insertado la información de tags correctamente."))
        .catch(err => console.error("Ha ocurrido un error a la hora de insertar la información de tags. Error: " + err));
}
exports.default = migrations;
