import { createDietHandler } from '../controllers/diet.controller';
import { createDietSchema } from '../schema/diet.schema';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const dietRouter = createTRPCRouter({
  createDiet: publicProcedure.input(createDietSchema).mutation(async ({ ctx, input }) => {
    console.log('estoy en el router')
    const diet = await createDietHandler({ctx, input});
    return diet
  }),

  getDiets : publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.diet.findMany()
  })
});