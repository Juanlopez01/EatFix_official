import { createDietHandler } from '../controllers/diet.controller';
import { createDietSchema } from '../schema/diet.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const dietRouter = createTRPCRouter({
  createDiet: publicProcedure.input(createDietSchema).mutation(async ({ ctx, input }) => {
    const diet = await createDietHandler({ctx, input});
    return diet
  }),

  getDiets : publicProcedure.query(({ ctx}) => {
    return ctx.prisma.diet.findMany()
  })
});