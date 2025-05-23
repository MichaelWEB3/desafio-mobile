import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Título obrigatório'),
    description: z.string().min(1, 'Descrição obrigatória'),
});

export type TaskFormData = z.infer<typeof taskSchema>;
