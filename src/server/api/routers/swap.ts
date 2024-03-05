import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const swapRouter = createTRPCRouter({
  getSwaps: publicProcedure.input(z.any()).query(() => {
    return {
      swaps: [
        {
          id: 1,
          fromTokenId: 1,
          toTokenId: 2,
          date: "2021-10-10T10:10:10Z",
          fromAmount: 1,
          toAmount: 2,
          fromPrice: 1000,
          toPrice: 2000,
        },
        {
          id: 2,
          fromTokenId: 1,
          toTokenId: 2,
          date: "2022-10-10T10:10:10Z",
          fromAmount: 1,
          toAmount: 2,
          fromPrice: 1000,
          toPrice: 2000,
        },
      ],
    };
  }),
  swapTokens: publicProcedure
    .input(
      z.object({
        fromTokenId: z.number(),
        toTokenId: z.number(),
        date: z.string(),
        fromAmount: z.number(),
        toAmount: z.number(),
        fromPrice: z.number(),
        //toPrice can be calculated
      }),
    )
    .mutation((input) => {
      return {
        success: true,
      };
    }),
});
