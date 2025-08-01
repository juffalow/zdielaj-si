import * as z from 'zod';

export const signInFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
