import * as z from 'zod';

export const signUpFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100, { message: 'Password must be less than 100 characters long' }).refine((val) => {
    return /[A-Z]/.test(val)
  }, {
    message: 'Password must contain at least one uppercase letter',
    path: ['password'],
  }).refine((val) => {
    return /[a-z]/.test(val)
  }, {
    message: 'Password must contain at least one lowercase letter',
    path: ['password'],
  }).refine((val) => {
    return /[0-9]/.test(val)
  }, {
    message: 'Password must contain at least one number',
    path: ['password'],
  }).refine((val) => {
    return /[!@#$%^&*]/.test(val)
  }, {
    message: 'Password must contain at least one special character',
    path: ['password'],
  }),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
