import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El usuario es requerido",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      required_error: "El email es inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      required_error: "La contraseña debe ser mínimo 8 caracteres",
    }),
  rolId: z.number().array().nonempty({
    message: "El rol es requerido",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      required_error: "El email es inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      required_error: "La contraseña debe ser mínimo 8 caracteres",
    }),
});
