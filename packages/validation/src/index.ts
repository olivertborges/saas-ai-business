import { z } from 'zod';

export const uuidSchema = z.string().uuid();

export const paginationSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

export const businessContextSchema = z.object({
  businessId: uuidSchema,
  userId: uuidSchema,
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type BusinessContextInput = z.infer<typeof businessContextSchema>;
