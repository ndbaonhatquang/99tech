import { z } from "zod";

export const createResourceSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional().default(""),
  category: z.string().max(100).optional().default(""),
});

export const updateResourceSchema = createResourceSchema.partial();

export const listQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  sort: z
    .enum(["created_at", "updated_at", "name"])
    .optional()
    .default("created_at"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});
