// src/schemas/paymentMethod.schema.ts
import { z } from 'zod';

export const paymentMethodSchema = z.object({
  cardholderName: z.string().min(1, { message: 'Insira o nome do titular' }),

  cardNumber: z.preprocess(
    val => (typeof val === 'string' ? val.replace(/\s+/g, '') : val),
    z
      .string()
      .length(16, { message: 'Deve conter exatamente 16 dígitos' })
      .regex(/^\d+$/, { message: 'Apenas dígitos são permitidos' }),
  ),

  expiryDate: z.preprocess(
    val => (typeof val === 'string' ? val.replace(/\//g, '') : val),
    z.string().regex(/^(0[1-9]|1[0-2])(2[5-9]|[3-9]\d)$/, {
      message: 'Data inválida',
    }),
  ),

  cvv: z.string().regex(/^\d{3}$/, { message: 'Deve conter 3 dígitos' }),
});

export type PaymentMethodForm = z.infer<typeof paymentMethodSchema>;
