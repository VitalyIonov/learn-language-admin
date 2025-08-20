import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  alias: z.string().min(1, "Alias is required"),
  questionTypeIds: z.array(z.number()),
});

export type Schema = z.infer<typeof schema>;
