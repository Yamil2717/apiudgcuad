import { Roles } from "./models/Roles";
import { Interest } from "./models/Interest";
import { Tags } from "./models/Tag";
import { User } from "./models/User";
import env from "./utils/env";

async function migrations() {
  await Roles.bulkCreate(
    [
      { id: "fc987eec-e7d6-43a2-a8fd-5e87ad8b1830", name: "Administrador" },
      { id: "76ee0015-c032-4482-ba56-a4ffd5c2ffda", name: "Empresario" },
      { id: "14697009-18a0-4024-83e3-7012cf804559", name: "Desarrollador" },
      {
        id: "459bc490-d384-4db9-8830-0a100bd74485",
        name: "Funcionario público",
      },
      { id: "57541c2b-48a7-4097-981d-28fc03a52009", name: "Vendedor" },
      { id: "134685eb-47ef-46c9-af43-d8442927645b", name: "Usuario vivienda" },
      { id: "129da192-8db4-42b8-955a-e7a65d0be9b5", name: "Académicos" },
      {
        id: "16f9b2cf-65fb-4a5f-8247-2a64c510eefd",
        name: "Organizaciones Civiles",
      },
      {
        id: "c9b223e0-bff6-412e-8cfa-7f9580ab628f",
        name: "Financieros de Vivienda",
      },
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

  await User.bulkCreate(
    [
      {
        id: "dec1b80e-f92e-4a11-a88c-0d58c11bb2e7",
        name: "Héctor Lavoe",
        email: "admin@gmail.com",
        password:
          "$2a$10$bAoGandv2.EsKPvO7jNKoeREKmZIs3/zAK0FYpu0le4JnxfbcugfS",
        countryIndicator: "57",
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
        groups: {},
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Christian Iglesias",
        email: "ciglesias1997@gmail.com",
        password:
          "$2a$10$j6kJCPdfs/ZhwnFG0Tl26uFL8fI.Xbn8cBWGbUkJy24vWfEbqkzRy",
        countryIndicator: "57",
        phone: "3052300750",
        postalCode: "12346",
        roleId: "14697009-18a0-4024-83e3-7012cf804559",
        tagsIds: [9],
        interestIds: ["a737d9e4-3c99-4e6d-b46d-c1ce7ee91012"],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: { lat: 0, long: 0, locationName: "No street name" },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Chris Igl",
        email: "christgg1997@gmail.com",
        password:
          "$2a$10$j6kJCPdfs/ZhwnFG0Tl26uFL8fI.Xbn8cBWGbUkJy24vWfEbqkzRy",
        countryIndicator: "57",
        phone: "3052307750",
        postalCode: "12350",
        roleId: "57541c2b-48a7-4097-981d-28fc03a52009",
        tagsIds: [1, 9],
        interestIds: [
          "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
          "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
        ],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: {
          lat: 10.9523327,
          long: -74.81292429999999,
          locationName:
            "Cra. 8g, Suroccidente, Barranquilla, Atlántico, Colombia",
        },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Hugo Diego",
        email: "diegolimore@gmail.com",
        password:
          "$2a$10$GiUnhaFyc0OQfY2bXnNwoeNstcQtq3Vn9SEcwp449UbIySuoJ5bBm",
        countryIndicator: "52",
        phone: "3314968614",
        postalCode: "45170",
        roleId: "14697009-18a0-4024-83e3-7012cf804559",
        tagsIds: [4, 40, 42],
        interestIds: [
          "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
          "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
          "496e6896-0279-4d59-a9ba-4ea93ac0e1ec",
        ],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: {
          lat: 20.6977081,
          long: -103.4650834,
          locationName:
            "Av. Del Bajío 5903, El Bajío, 45017 Zapopan, Jal., Mexico",
        },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Alberto",
        email: "aglopezruiz@gmail.com",
        password:
          "$2a$10$9/U77i8u1Yw9EGgS3eBkJutSANqeGf6.y8hBf35f/6XJyUJUPI0m2",
        countryIndicator: "52",
        phone: "3328126249",
        postalCode: "44100",
        roleId: "129da192-8db4-42b8-955a-e7a65d0be9b5",
        tagsIds: [19],
        interestIds: ["31fec336-370e-4f8d-a084-707740433315"],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: {
          lat: 20.6847507,
          long: -103.3510474,
          locationName:
            "Calle Contreras Medellín 518, Centro, 44100 Guadalajara, Jal., Mexico",
        },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Francisco",
        email: "panchoxfx@gmail.com",
        password:
          "$2a$10$veOlfPqQyuCFRoS6tBkQn.32BEmwJpytHVq5oGKDqU22RYkDQkRx6",
        countryIndicator: "52",
        phone: "3315381729",
        postalCode: "45170",
        roleId: "14697009-18a0-4024-83e3-7012cf804559",
        tagsIds: [10, 16],
        interestIds: [
          "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
          "31fec336-370e-4f8d-a084-707740433315",
          "12fdfc18-99c3-4fa0-8d7f-0932b9066e5b",
          "8d79c80e-7ca3-4636-9b0f-fe234a035c78",
        ],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: {
          lat: 20.7201731,
          long: -103.3625616,
          locationName:
            "Colina Galia 2175, Colinas de Atemajac, 45170 Zapopan, Jal., Mexico",
        },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Juan Demerutis",
        email: "juan.demerutis@gmail.com",
        password:
          "$2a$10$abDbKSEernNF.l.k9RZLm.k5xIBPCVqXkS7LmBAYnMLWpiSQ79XXG",
        countryIndicator: "52",
        phone: "3338154886",
        postalCode: "44250",
        roleId: "129da192-8db4-42b8-955a-e7a65d0be9b5",
        tagsIds: [2, 9, 82],
        interestIds: [
          "a737d9e4-3c99-4e6d-b46d-c1ce7ee91012",
          "31fec336-370e-4f8d-a084-707740433315",
          "92eb2e67-7f15-4027-837a-332dad68ac13",
        ],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: {
          lat: 20.7404052,
          long: -103.3120695,
          locationName:
            "Torre Administrativa, Calz. Independencia Norte, Huentitán El Bajo, 44250 Guadalajara, Jal., Mexico",
        },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
      {
        name: "Carlos sanchez",
        email: "carlos19972107sanchez@gmail.com",
        password:
          "$2a$10$Gcs0yFOtQO975K1I0O.JSeEU7J.4eXfXOR.Tp9YpeaumQWCH.z1AC",
        countryIndicator: "52",
        phone: "3335552123",
        postalCode: "54100",
        roleId: "14697009-18a0-4024-83e3-7012cf804559",
        tagsIds: [15, 19, 59],
        interestIds: [
          "31fec336-370e-4f8d-a084-707740433315",
          "f95c1843-c46e-443e-9c3d-4407bf8f25a6",
          "92eb2e67-7f15-4027-837a-332dad68ac13",
        ],
        avatar: `${env.api.urlAPI}/images/user/default.jpeg`,
        header: `${env.api.urlAPI}/images/profile_banner/default.jpeg`,
        location: {
          lat: 22.8845846,
          long: -109.9537216,
          locationName:
            "Predio Paraíso Escondido s/n, 23450 Cabo San Lucas, B.C.S., México",
        },
        dateBirth: "2022-11-28 00:45:12.427-05",
        blocking: { enable: false },
      },
    ],
    {
      ignoreDuplicates: true,
      logging: false,
    }
  )
    .then(() => console.info("Se ha insertado los usuario correctamente."))
    .catch((err) =>
      console.error(
        "Ha ocurrido un error a la hora de insertar el usuario de admin. Error: " +
          err
      )
    );
}

export default migrations;
