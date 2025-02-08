import { z } from 'zod';

export const userFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' }) // Nama wajib diisi
    .max(100, { message: 'Name cannot exceed 100 characters.' }), // Maksimum panjang nama
  email: z
    .string()
    .email({ message: 'Invalid email format.' }) // Email validasi format
    .nonempty({ message: 'Email is required.' }), // Email wajib diisi
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }) // Password minimal 8 karakter
    .max(50, { message: 'Password cannot exceed 50 characters.' }) // Password maksimum 50 karakter
    .regex(/[A-Za-z]/, { message: 'Password must contain letters.' }) // Harus ada huruf
    .regex(/[0-9]/, { message: 'Password must contain numbers.' }), // Harus ada angka
  role: z
    .string()
    .min(1, { message: 'Role is required.' }) // Role wajib diisi
    .refine(
      (value) => ['Agent', 'Supervisor', 'Admin'].includes(value),
      { message: 'Invalid role. Allowed values: Agent, Supervisor, Admin.' } // Validasi role
    ),
  divisionId: z
    .string()
    .min(1, { message: 'Divisions is required.' }) // Role wajib diisi
    .refine(
      (value) => ['Agent', 'Supervisor', 'Admin'].includes(value),
      { message: 'Invalid role. Allowed values: Agent, Supervisor, Admin.' } // Validasi role
    ),
  teamId: z
    .string()
    .min(1, { message: 'Team is required.' }) // Role wajib diisi
    .refine(
      (value) => ['Agent', 'Supervisor', 'Admin'].includes(value),
      { message: 'Invalid role. Allowed values: Agent, Supervisor, Admin.' } // Validasi role
    ),
});

export type UserFormInput = z.infer<typeof userFormSchema>;
