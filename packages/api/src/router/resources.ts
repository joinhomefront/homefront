import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import { uploadRemoteImageToS3 } from "@homefront/aws";
import {
  DomainArea,
  jsonArrayFrom,
  jsonObjectFrom,
  Resource,
  ResourceVote,
} from "@homefront/db";
import { getMetadata } from "@homefront/scraper";
import {
  LinkResourceSchema,
  VoteForResourceSchema,
} from "@homefront/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

type JoinedResource = Resource & {
  domainAreas: DomainArea[];
  votes: number;
  userVote: ResourceVote | null;
  isBookmarked: boolean;
};

export const resourcesRouter = {
  getMetadataForUrl: protectedProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { url } = input;

      const metadata = await getMetadata(url);

      return metadata;
    }),

  createResource: protectedProcedure
    .input(LinkResourceSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, type, url } = input;
      const userId = ctx.session.user.id;

      const metadata = await getMetadata(url);

      let image: string | null = null;

      if (metadata.image) {
        image = await uploadRemoteImageToS3(metadata.image, "images/resources");
      }

      const resource = await ctx.db.transaction().execute(async (tx) => {
        const resource = await tx
          .insertInto("resources")
          .values({ title, url, sharedBy: userId, type, image })
          .returningAll()
          .executeTakeFirstOrThrow();

        await tx
          .insertInto("resourceVotes")
          .values({
            resourceId: resource.id,
            userId,
            vote: 1,
          })
          .execute();

        return resource;
      });

      return resource;
    }),

  getResource: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const resource = await ctx.db
        .selectFrom("resources as r")
        .where("id", "=", input)
        .select((eb) => [
          "r.id",
          "r.title",
          "r.description",
          "r.body",
          "r.type",
          "r.url",
          "r.canonicalUrl",
          "r.image",
          "r.sharedBy",
          "r.createdAt",
          "r.updatedAt",
          jsonArrayFrom(
            eb
              .selectFrom("resourceDomainAreas as rda")
              .innerJoin("domainAreas as da", "da.id", "rda.domainAreaId")
              .selectAll()
              .whereRef("rda.resourceId", "=", "r.id"),
          ).as("domainAreas"),
          jsonObjectFrom(
            eb
              .selectFrom("resourceVotes as rv")
              .select([
                "rv.id",
                "rv.vote",
                "rv.resourceId",
                "rv.userId",
                "rv.createdAt",
                "rv.updatedAt",
              ])
              .whereRef("rv.resourceId", "=", "r.id")
              .where("rv.userId", "=", userId)
              .limit(1),
          ).as("userVote"),
          sql<number>`(SELECT COALESCE(SUM(rv.vote)::integer, 0) FROM resource_votes rv WHERE rv.resource_id = r.id)`.as(
            "votes",
          ),
          sql<boolean>`EXISTS (
            SELECT 1 FROM resource_bookmarks rb 
            WHERE rb.resource_id = r.id 
            AND rb.user_id = ${userId}
          )`.as("isBookmarked"),
        ])
        .groupBy(["r.id"])
        .executeTakeFirstOrThrow();

      return resource satisfies JoinedResource;
    }),

  getResources: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const resources = await ctx.db
      .selectFrom("resources as r")
      .selectAll()
      .select((eb) => [
        "r.id",
        "r.title",
        "r.description",
        "r.body",
        "r.type",
        "r.url",
        "r.canonicalUrl",
        "r.image",
        "r.sharedBy",
        "r.createdAt",
        "r.updatedAt",
        jsonArrayFrom(
          eb
            .selectFrom("resourceDomainAreas as rda")
            .innerJoin("domainAreas as da", "da.id", "rda.domainAreaId")
            .selectAll()
            .whereRef("rda.resourceId", "=", "r.id"),
        ).as("domainAreas"),
        jsonObjectFrom(
          eb
            .selectFrom("resourceVotes as rv")
            .select([
              "rv.id",
              "rv.vote",
              "rv.resourceId",
              "rv.userId",
              "rv.createdAt",
              "rv.updatedAt",
            ])
            .whereRef("rv.resourceId", "=", "r.id")
            .where("rv.userId", "=", userId)
            .limit(1),
        ).as("userVote"),
        sql<number>`(SELECT COALESCE(SUM(rv.vote)::integer, 0) FROM resource_votes rv WHERE rv.resource_id = r.id)`.as(
          "votes",
        ),
        sql<boolean>`EXISTS (
          SELECT 1 FROM resource_bookmarks rb 
          WHERE rb.resource_id = r.id 
          AND rb.user_id = ${userId}
        )`.as("isBookmarked"),
      ])
      .groupBy(["r.id"])
      .execute();

    return resources satisfies JoinedResource[];
  }),

  voteForResource: protectedProcedure
    .input(VoteForResourceSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { resourceId, vote } = input;

      await ctx.db
        .insertInto("resourceVotes")
        .values({
          resourceId,
          userId,
          vote,
        })
        .onConflict((oc) =>
          oc
            .columns(["resourceId", "userId"])
            .doUpdateSet({ vote, updatedAt: sql`now()` }),
        )
        .execute();
    }),

  bookmarkResource: protectedProcedure
    .input(
      z.object({
        resourceId: z.string().uuid(),
        bookmark: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { resourceId, bookmark } = input;

      if (bookmark) {
        await ctx.db
          .insertInto("resourceBookmarks")
          .values({
            resourceId,
            userId,
          })
          .onConflict((oc) => oc.columns(["resourceId", "userId"]).doNothing())
          .execute();
      } else {
        await ctx.db
          .deleteFrom("resourceBookmarks")
          .where("resourceId", "=", resourceId)
          .where("userId", "=", userId)
          .execute();
      }
    }),
} satisfies TRPCRouterRecord;
