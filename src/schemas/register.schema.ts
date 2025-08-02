// src/schemas/register.schema.ts
import { z } from 'zod';

/**
 * Schema de validação para registro de usuário
 * - email: obrigatório, formato de e-mail válido
 * - password: obrigatório, mínimo de 6 caracteres
 */
export const registerSchema = z.object({
  email: z.string().nonempty({ message: 'E-mail é obrigatório' }),
  password: z
    .string()
    .nonempty({ message: 'Senha é obrigatória' })
    .min(6, { message: 'A senha deve ter ao menos 6 caracteres' }),
});

export type RegisterForm = z.infer<typeof registerSchema>;
