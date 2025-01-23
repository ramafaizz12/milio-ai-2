import { z } from 'zod';

export const addAIFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' }) // Nama wajib diisi
    .max(100, { message: 'Name cannot exceed 100 characters.' }), // Maksimum panjang nama
  description: z
    .string()
    .min(1, { message: 'Description is required.' }) // Nama wajib diisi
    .max(300, { message: 'Name cannot exceed 300 characters.' }), // Maksimum panjang nama
});

export type AddaiFormInput = z.infer<typeof addAIFormSchema>;
