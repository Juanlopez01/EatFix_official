import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const createDietSchema = z.object({
  type: z.string().optional(),
  age: z.number(),
  weight: z.number(),
  height: z.number(),
  country: z.string().optional(),
  price: z.string().optional(),
  dontuse: z.string().optional(),
  preferences: z.string().optional(),
  userId: z.string(),
});
export type CreateDietTypes = TypeOf<typeof createDietSchema>;

/*------------------------------------*/