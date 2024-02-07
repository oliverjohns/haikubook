import { postRouter } from "~/server/api/routers/post";
import { haikuRouter } from "~/server/api/routers/haiku";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  haiku: haikuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
