import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { i18n } from '@acme/i18n';
import { Response, TRPCErrorCode, type Params } from '../common';
import type {
  CreateDietTypes,
} from '../schema/diet.schema';

export const createDietHandler = async ({ ctx, input }: Params<CreateDietTypes>) => {
  try {
    if(input.dietQuota && input.dietQuota > 0){
      const user = await ctx.prisma.user.update({
        where: {
          id: input.userId
        },
        data: {
          dietQuota: input.dietQuota - 1
        }
      })
      const diet = await ctx.prisma.diet.create({
        data: {
          type: input.type ?? 'Normal',
          age: input.age,
          size: input.size ?? '',
          goal: input.goal ?? '',
          country: input.country ?? '',
          price: input.price ?? '',
          dontuse: input.dontuse ?? '',
          preferences: input.preferences ?? '',
          user: {
            connect: { id: input.userId },
          },
        },
      });
      return {
        status: Response.SUCCESS,
        data: {
          diet,
          user
        },
      };

    } else {
      throw new TRPCError({
        code: TRPCErrorCode.UNAUTHORIZED,
        message: 'Insufficient quota'
      })
    }
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
    //   const message = i18n.t('api:account.create.error.notFound');
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Error input',
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = i18n.t('common:message.error.unauthorized');
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }



      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};
