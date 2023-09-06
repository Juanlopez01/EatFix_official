import OpenAI from 'openai';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { i18n } from '@acme/i18n';
import { Response, TRPCErrorCode, type Params } from '../common';
require('dotenv').config();
import type {
  CreateDietTypes,
} from '../schema/diet.schema';
const apiKey = process.env.OPENAI_API_KEY as string
const openai = new OpenAI({
  apiKey: apiKey,
})
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
      const response = await openai.chat.completions.create({
        messages: [{role: 'user' , content: `creates a weekly diet in string format to parse with JSON.parse ordered as follows : { "Monday":  {"breakfast"," lunch"," snack","dinner"}} and so with all days of the week.Also create it with the following features: Country: ${input.country ?? 'any'} , Size: ${input.size ?? 'Average'}, Age: ${input.age ?? 'any'}, Goal: ${input.goal ?? 'any'}, Cost: ${input.price ?? 'Normal'}, Diet: ${input.type ?? 'Normal'} ${input.preferences ? `, Preferences: ${input.preferences?? 'nothing'}` : ''} ${input.dontuse ? `, Foods to avoid: ${input.dontuse ?? 'nothing'}`: ''}.`}],
        model: 'gpt-3.5-turbo-0613',
      }).catch(err => {return err})

      // const diet = await ctx.prisma.diet.create({
      //   data: {
      //     type: input.type ?? 'Normal',
      //     age: input.age,
      //     size: input.size ?? '',
      //     goal: input.goal ?? '',
      //     country: input.country ?? '',
      //     price: input.price ?? '',
      //     dontuse: input.dontuse ?? '',
      //     preferences: input.preferences ?? '',
      //     user: {
      //       connect: { id: input.userId },
      //     },
      //   },
      // });
      const responseConter = JSON.parse(response.choices[0].message.content)
      return {
        status: Response.SUCCESS,
        data: {
          dietResponse: responseConter, 
          user,
        },
      };}
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





// const weeklyDiet = {
//   Monday: {
//     breakfast: "Croissant with butter",
//     lunch: "Steak frites",
//     snack: "Camembert cheese",
//     dinner: "Ratatouille"
//   },
//   Tuesday: {
//     breakfast: "Pain au chocolat",
//     lunch: "Nicoise salad",
//     snack: "Baguette with brie",
//     dinner: "Coq au vin"
//   },
//   Wednesday: {
//     breakfast: "Omelette with mushrooms",
//     lunch: "Quiche Lorraine",
//     snack: "Goat cheese tart",
//     dinner: "Bouillabaisse"
//   },
//   Thursday: {
//     breakfast: "Yogurt with honey",
//     lunch: "Cassoulet",
//     snack: "Croque-monsieur",
//     dinner: "Duck confit"
//   },
//   Friday: {
//     breakfast: "Fruit salad",
//     lunch: "Salade Lyonnaise",
//     snack: "Escargots",
//     dinner: "Moules marinière"
//   },
//   Saturday: {
//     breakfast: "Croissant with ham and cheese",
//     lunch: "Bouillabaisse",
//     snack: "Foie gras",
//     dinner: "Beef bourguignon"
//   },
//   Sunday: {
//     breakfast: "French toast",
//     lunch: "Pot-au-feu",
//     snack: "Tarte Tatin",
//     dinner: "Cassoulet"
//   }
// };

// const userInformation = {
//   Country: "France",
//   Size: "Overweight",
//   Age: 32,
//   Goal: "Improved metabolic health",
//   Cost: "Normal",
//   Diet: "Mediterranean",
//   Preferences: "fat"
// };
