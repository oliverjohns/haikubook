import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const haikuRouter = createTRPCRouter({
  getLatest: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(30) }))
    .query(({ ctx, input }) => {
      return ctx.db.haiku.findMany({
        orderBy: { createdAt: "desc" },
        take: input.limit,
        include: {
          haikuLikes: { select: { userId: true } },
          author: { select: { name: true } },
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string().min(1).max(200) }))
    .mutation(async ({ ctx, input }) => {
      const haikuIsThreeLines = input.content.split("\n").length === 3;
      if (!haikuIsThreeLines) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Haiku must be three lines",
        });
      }
      return ctx.db.haiku.create({
        data: {
          content: input.content,
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  like: protectedProcedure
    .input(z.object({ haikuId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.haikuLike.upsert({
        where: {
          haikuId_userId: {
            haikuId: input.haikuId,
            userId: ctx.session.user.id,
          },
        },
        create: {
          haiku: { connect: { id: input.haikuId } },
          user: { connect: { id: ctx.session.user.id } },
        },
        update: {
          haiku: { connect: { id: input.haikuId } },
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  unlike: protectedProcedure
    .input(z.object({ haikuId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.haikuLike.deleteMany({
        where: {
          haikuId: input.haikuId,
          userId: ctx.session.user.id,
        },
      });
    }),
});
