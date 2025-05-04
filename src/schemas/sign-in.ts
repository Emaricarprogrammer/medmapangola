import { z } from 'zod';

export const signInScheme = z.object({
  email: z.string().email('Introduza um e-mail válido!'),
  password: z.string().min(6, 'Palavra Passe Inválida!'),
});

export type SignInData = z.infer<typeof signInScheme>;
