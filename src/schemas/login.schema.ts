import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ error: 'Use um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'Senha precisa ter ao menos 6 caracteres' }),
});

export type LoginForm = z.infer<typeof loginSchema>;
