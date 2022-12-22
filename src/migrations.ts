import { Roles } from "./models/Roles";
import { Interest } from "./models/Interest";
import { Tags } from "./models/Tag";
import { Groups } from "./models/Groups";
import { User } from "./models/User";
import env from "./utils/env";

async function migrations() {
  await Roles.bulkCreate(
    [
      { id: "fc987eec-e7d6-43a2-a8fd-5e87ad8b1830", name: "Administrador" },
      { name: "Empresario" },
      { name: "Desarrollador" },
      { name: "Funcionario público" },
      { name: "Vendedor" },
      { name: "Usuario vivienda" },
      { name: "Académicos" },
      { name: "Organizaciones Civiles" },
      { name: "Financieros de Vivienda" },
    ],
    {
      ignoreDuplicates: true,
      logging: false,
    }
  )
    .then(() =>
      console.info("Se ha insertado la información de roles correctamente.")
    )
    .catch((err) =>
      console.error(
        "Ha ocurrido un error a la hora de insertar la información de roles. Error: " +
          err
      )
    );

  await Interest.bulkCreate(
    [
      {
        id: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
        name: "Transporte público",
        picture:
          "https://live.staticflickr.com/3071/2758112598_94ddb62203_b.jpg",
      },
      {
        id: "31fec336-370e-4f8d-a084-707740433315",
        name: "Vivienda deshabitada",
        picture:
          "https://www.capitalmexico.com.mx/wp-content/uploads/2019/04/Foto-Especial-29-2.jpg",
      },
      {
        id: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
        name: "Gestión Urbana",
        picture:
          "https://www.alcaldesdemexico.com/wp-content/uploads/2020/06/Gestion_urbana.jpg",
      },
      {
        id: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
        name: "Producción de Vivienda",
        picture:
          "https://www.rrhhdigital.com/userfiles/construccion-obreros-obra.jpg",
      },
      {
        id: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
        name: "Inseguridad vial",
        picture:
          "https://www.serviasistenciaexpress.com/wp-content/uploads/2018/07/Seguridad-Vial.jpg",
      },
      {
        id: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
        name: "Obras viales",
        picture:
          "https://www.diariodexalapa.com.mx/incoming/8z3257-obras-xalapa.jpg/ALTERNATES/LANDSCAPE_768/Obras%20Xalapa.jpg",
      },
      {
        id: "92eb2e67-7f15-4027-837a-332dad68ac13",
        name: "Vivienda y trabajo",
        picture:
          "https://images.adsttc.com/media/images/5d72/b905/284d/d10d/8700/0033/newsletter/17_%C2%A9_Iwan_Baan.jpg",
      },
    ],
    {
      ignoreDuplicates: true,
      logging: false,
    }
  )
    .then(() =>
      console.info("Se ha insertado la información de intereses correctamente.")
    )
    .catch((err) =>
      console.error(
        "Ha ocurrido un error a la hora de insertar la información de intereses. Error: " +
          err
      )
    );

  await Tags.bulkCreate(
    [
      // Transporte público
      { hashtag: "via", idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012" },
      {
        hashtag: "movilidad",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      {
        hashtag: "carretera",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      {
        hashtag: "avenida",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      { hashtag: "calle", idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012" },
      { hashtag: "buseta", idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012" },
      { hashtag: "taxis", idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012" },
      { hashtag: "rutas", idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012" },
      {
        hashtag: "paradas_buses",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      {
        hashtag: "destino",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      {
        hashtag: "terminal",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      {
        hashtag: "pasajeros",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      // Vivienda deshabitada
      {
        hashtag: "residentes",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "inmueble",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "ausentado",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "residencia",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "contaminación",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "periódica",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "desocupada",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      { hashtag: "póliza", idInterest: "31fec336-370e-4f8d-a084-707740433315" },
      {
        hashtag: "incómodos",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "existentes",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        hashtag: "análisis",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      // Gestión Urbana
      { hashtag: "casa", idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b" },
      {
        hashtag: "apartamento",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      { hashtag: "propia", idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b" },
      {
        hashtag: "proyecto",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      {
        hashtag: "análisis",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      {
        hashtag: "urbanismo",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      {
        hashtag: "ciudadana",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      {
        hashtag: "auditoría",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      { hashtag: "módulo", idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b" },
      {
        hashtag: "climático",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      {
        hashtag: "coordinación",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      // Producción de Vivienda
      { hashtag: "urbano", idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78" },
      {
        hashtag: "habitacional",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      {
        hashtag: "innovación",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      {
        hashtag: "crecimiento",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      { hashtag: "modelo", idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78" },
      {
        hashtag: "producción",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      {
        hashtag: "vivienda",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      {
        hashtag: "sociedad",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      { hashtag: "social", idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78" },
      {
        hashtag: "hipotecaria",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      {
        hashtag: "económico",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
      { hashtag: "censo", idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78" },
      // Inseguridad vial
      {
        hashtag: "accesibilidad",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "política",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "sencilla",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "accidentes",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "disminuir",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "prevención",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "muertos",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "choques",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "controlar",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "consecuencia",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "heridos",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        hashtag: "funcionamiento",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      // Obras viales
      {
        hashtag: "construcción",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "rehabilitación",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "adecuación",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "mejoramiento",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "mantenimiento",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "tráfico",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "vehicular",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      { hashtag: "vías", idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6" },
      {
        hashtag: "urbanas",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "carreteras",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "infraestructura",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      {
        hashtag: "demolición",
        idInterest: "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
      },
      // Vivienda y trabajo
      { hashtag: "casa", idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13" },
      {
        hashtag: "autonomía",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "habitacional",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "trayectorias",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "mudarse",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "laboral",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "familias",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "vacantes",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "subsidio ",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "administren",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      {
        hashtag: "beneficiario",
        idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13",
      },
      { hashtag: "empleo", idInterest: "92eb2e67-7f15-4027-837a-332dad68ac13" },
    ],
    {
      ignoreDuplicates: true,
      logging: false,
    }
  )
    .then(() =>
      console.info("Se ha insertado la información de tags correctamente.")
    )
    .catch((err) =>
      console.error(
        "Ha ocurrido un error a la hora de insertar la información de tags. Error: " +
          err
      )
    );

  await Groups.bulkCreate(
    [
      {
        name: "Ciclovías",
        picture:
          "https://images.pexels.com/photos/386024/pexels-photo-386024.jpeg",
        idInterest: "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
      },
      {
        name: "Vialidad",
        picture:
          "https://images.pexels.com/photos/5835467/pexels-photo-5835467.jpeg",
        idInterest: "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
      },
      {
        name: "Pasos peatonales",
        picture:
          "https://images.pexels.com/photos/1309687/pexels-photo-1309687.jpeg",
        idInterest: "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
      },
      {
        name: "Infraestructura dañada",
        picture:
          "https://images.pexels.com/photos/5659371/pexels-photo-5659371.jpeg",
        idInterest: "31fec336-370e-4f8d-a084-707740433315",
      },
      {
        name: "Edificios históricos",
        picture:
          "https://images.pexels.com/photos/7692217/pexels-photo-7692217.jpeg",
        idInterest: "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      },
    ],
    {
      ignoreDuplicates: true,
      logging: false,
    }
  )
    .then(() =>
      console.info("Se ha insertado la información de grupos correctamente.")
    )
    .catch((err) =>
      console.error(
        "Ha ocurrido un error a la hora de insertar la información de grupos. Error: " +
          err
      )
    );

  await User.create(
    {
      name: "Héctor Lavoe",
      email: "admin@gmail.com",
      password: "$2a$10$bAoGandv2.EsKPvO7jNKoeREKmZIs3/zAK0FYpu0le4JnxfbcugfS",
      phone: "3005849945",
      postalCode: "081455",
      roleId: "fc987eec-e7d6-43a2-a8fd-5e87ad8b1830",
      tagsIds: [2, 12, 14, 15, 18, 34],
      interestIds: [
        "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
        "31fec336-370e-4f8d-a084-707740433315",
        "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
        "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
      ],
      avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
      header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
      location: {
        lat: 37.4219983,
        long: -122.084,
        locationName: "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
      },
      dateBirth: "2022-11-28 00:45:12.427-05",
      blocking: { enable: false },
    },
    {
      ignoreDuplicates: true,
      logging: false,
    }
  )
    .then(() =>
      console.info("Se ha insertado el usuario de admin correctamente.")
    )
    .catch((err) =>
      console.error(
        "Ha ocurrido un error a la hora de insertar el usuario de admin. Error: " +
          err
      )
    );
}

export default migrations;
