import { z } from 'zod';

export const recoveryScheme = z.object({
  email: z.string().email('Introduza um e-mail válido!'),
});

export type RecoveryData = z.infer<typeof recoveryScheme>;
