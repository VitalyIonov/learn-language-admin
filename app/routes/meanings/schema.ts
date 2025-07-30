import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  categoryId: z.number().optional().nullable(),
  levelId: z.number().optional().nullable(),
});

export type Schema = z.infer<typeof schema>;
