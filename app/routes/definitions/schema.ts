import { z } from 'zod';

export const schema = z.object({
  text: z.string().min(1, 'Text is required'),
  categoryId: z.number().optional().nullable(),
  levelId: z.number().optional().nullable(),
  meaningIds: z.array(z.number()).optional(),
});

export type Schema = z.infer<typeof schema>;
