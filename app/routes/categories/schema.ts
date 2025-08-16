import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageId: z.number().optional(),
});

export type Schema = z.infer<typeof categorySchema>;
