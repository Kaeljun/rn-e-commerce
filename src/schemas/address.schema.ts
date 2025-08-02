import { z } from 'zod';

export const addressSchema = z.object({
  cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/, {
    message: 'CEP inválido. Use o formato 12345-678.',
  }),
  street: z.string().min(1, { message: 'Insira o nome da rua.' }),
  number: z.string().min(1, { message: 'Insira um número.' }),
  neighborhood: z.string().min(1, { message: 'Insira o bairro.' }),
  city: z.string().min(1, { message: 'Insira o nome da rua.' }),

  addressName: z
    .string()
    .min(1, { message: 'Nome do endereço é obrigatório.' }),
});

export type AddressForm = z.infer<typeof addressSchema>;
