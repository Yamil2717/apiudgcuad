import { object, string, array, date, ref } from "yup";

export const createUserValidation = object({
  body: object({
    name: string()
      .required("Debe ingresar su nombre completo")
      .typeError("Debe ingresar un nombre completo"),
    email: string()
      .email()
      .required("Debe ingresar un correo electrónico.")
      .typeError("Debe ingresar un correo electrónico."),
    password: string()
      .min(8)
      .required("Debe ingresar una contraseña de mínimo 8 dígitos.")
      .typeError("Debe ingresar una contraseña de mínimo 8 dígitos."),
    rePassword: string()
      .oneOf([ref("password"), null], "Las contraseñas no coinciden.")
      .required("Debe ingresar la confirmación de la contraseña"),
    countryIndicator: string()
      .min(1)
      .max(3)
      .required(
        "Debe ingresar un indicador del país de su numero de teléfono válido."
      )
      .typeError(
        "Debe ingresar un indicador del país de su numero de teléfono válido."
      ),
    phone: string()
      .min(10)
      .max(10)
      .required("Debe ingresar un numero de teléfono válido.")
      .typeError("Debe ingresar un numero de teléfono válido."),
    postalCode: string()
      .max(10)
      .required("Debe ingresar su código postal")
      .typeError("Debe ingresar su código postal"),
    roleId: string()
      .uuid()
      .required("Debe ingresar un tipo de usuario.")
      .typeError("Debe ingresar un tipo de usuario"),
    tagsIds: array()
      .required("Debe seleccionar al menos un tag de un interés.")
      .typeError("Debe seleccionar al menos un tag de un interés."),
    interestIds: array()
      .required("Debe seleccionar al menos un interés")
      .typeError("Debe seleccionar al menos un interés"),
    location: object()
      .required("Ha ocurrido un error, no pudimos obtener su ubicación")
      .typeError("Ha ocurrido un error, no pudimos obtener su ubicación"),
    dateBirth: date()
      .required("Debe ingresar su fecha de nacimiento")
      .typeError("Debe ingresar su fecha de nacimiento"),
    avatar: string().typeError("La fotografía no es válida."),
  }),
});

export const userLoginValidation = object({
  body: object({
    email: string()
      .email()
      .required("Debe ingresar un correo electrónico.")
      .typeError("Debe ingresar un correo electrónico."),
    password: string()
      .min(8)
      .required("Debe ingresar una contraseña válida.")
      .typeError("Debe ingresar una contraseña válida."),
  }),
});
