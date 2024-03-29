import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { tokenRouter } from "~/server/api/routers/token";
import { swapRouter } from "./routers/swap";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  token: tokenRouter,
  swap: swapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
