import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tokenRouter = createTRPCRouter({
  getTokens: publicProcedure.input(z.any()).query(() => {
    return {
      tokens: [
        {
          id: 1,
          name: "Ethereum",
          symbol: "ETH",
          logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        },
        {
          id: 2,
          name: "Bitcoin",
          symbol: "BTC",
          logo: "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
        },
      ],
    };
  }),
});
