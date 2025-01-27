import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import normalizeUrl from "normalize-url";
import { z } from "zod";

import { Session } from "@homefront/auth/types";
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

/**
 * Check if the user can modify a resource
 *
 * @param session The user session returned from the Context
 * @param resource The resource to check
 * @returns boolean Whether the user can modify the resource
 */
const canModifyResource = (session: Session | null, resource: Resource) => {
  const { id: userId, role: userRole } = session?.user ?? {};
  return (
    resource.sharedBy === userId ||
    userRole === "admin" ||
    userRole === "moderator"
  );
};

type JoinedResource = Resource & {
  domainAreas: DomainArea[];
  votes: number;
  userVote: ResourceVote | null;
  isBookmarked: boolean;
  sharedByUsername: string;
};

export interface ResourceWithScore extends Resource {
  hotScore: number;
  votes: number;
}

/**
 * Normalize and hash a URL
 *
 * This function normalizes a URL and then hashes it using SHA-256
 * to create a unique identifier for the URL
 *
 * The normalization process includes:
 * - Defaulting to HTTPS
 * - Normalizing the protocol
 * - Forcing HTTPS
 * - Stripping the www subdomain
 * - Sorting query parameters
 * - Removing query parameters starting with "utm_" or "ref"
 * - Stripping the text fragment
 * - Removing the trailing slash
 * - Removing the directory index
 *
 * The hash is then created by hashing the normalized URL using SHA-256
 *
 * @param url The URL to normalize and hash
 * @returns An object containing the normalized URL and its hash
 */
async function normalizeAndHashUrl(url: string) {
  const normalizedUrl = normalizeUrl(url, {
    defaultProtocol: "https",
    normalizeProtocol: true,
    forceHttps: true,
    stripWWW: true,
    removeExplicitPort: true,
    sortQueryParameters: true,
    removeQueryParameters: [/^utm_/, /^ref/],
    stripTextFragment: true,
    removeTrailingSlash: true,
    removeDirectoryIndex: true,
  });

  const encoder = new TextEncoder();
  const data = encoder.encode(normalizedUrl);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return { hash, normalizedUrl };
}

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
      const { title, type, url, description, domainAreaIds } = input;
      const userId = ctx.session.user.id;

      const metadata = await getMetadata(url);

      let image: string | null = null;

      if (metadata.image) {
        try {
          const uploadedImage = await uploadRemoteImageToS3(
            metadata.image,
            "images/resources",
          );
          console.log("setting image");
          // Only set image if upload succeeds
          image = uploadedImage;
        } catch (error) {
          console.error("Failed to upload image:", error);
          // Continue without image if the upload failed
          image = null;
        }
      }

      const { hash, normalizedUrl } = await normalizeAndHashUrl(url);

      const existingResource = await ctx.db
        .selectFrom("resources")
        .selectAll()
        .where("urlHash", "=", hash)
        .executeTakeFirst();

      if (existingResource) {
        await ctx.db
          .insertInto("resourceVotes")
          .values({
            resourceId: existingResource.id,
            userId,
            vote: 1,
          })
          .onConflict((oc) => oc.columns(["resourceId", "userId"]).doNothing())
          .execute();

        return existingResource;
      }

      const resource = await ctx.db.transaction().execute(async (tx) => {
        const resource = await tx
          .insertInto("resources")
          .values({
            title,
            url,
            canonicalUrl: normalizedUrl,
            sharedBy: userId,
            type,
            image,
            description,
            urlHash: hash,
            metadata: JSON.stringify(metadata),
            hotScore: 0,
            risingScore: 0,
            votes: 1,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        if (domainAreaIds?.length) {
          await tx
            .insertInto("resourceDomainAreas")
            .values(
              domainAreaIds.map((domainAreaId) => ({
                resourceId: resource.id,
                domainAreaId,
                createdBy: userId,
              })),
            )
            .execute();
        }

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
        .innerJoin("users as u", "u.id", "r.sharedBy")
        .where("r.id", "=", input)
        .select((eb) => [
          "r.id",
          "r.title",
          "r.description",
          "r.body",
          "r.type",
          "r.url",
          "r.urlHash",
          "r.canonicalUrl",
          "r.image",
          "r.metadata",
          "r.sharedBy",
          "r.hotScore",
          "r.risingScore",
          "r.votes",
          "r.createdAt",
          "r.updatedAt",
          "u.username as sharedByUsername",
          jsonArrayFrom(
            eb
              .selectFrom("resourceDomainAreas as rda")
              .innerJoin("domainAreas as da", "da.id", "rda.domainAreaId")
              .selectAll()
              .whereRef("rda.resourceId", "=", "r.id")
              .orderBy("da.title"),
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
          sql<boolean>`EXISTS (
            SELECT 1 FROM resource_bookmarks rb 
            WHERE rb.resource_id = r.id 
            AND rb.user_id = ${userId}
          )`.as("isBookmarked"),
        ])
        .groupBy(["r.id", "u.id"])
        .executeTakeFirstOrThrow();

      return resource satisfies JoinedResource;
    }),

  getResources: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().base64().optional(),
        sort: z.enum(["hot", "new", "top", "rising"]).optional(),
        filter: z.enum(["saved", "upvoted", "downvoted"]).optional(),
      }),
    )

    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { limit, filter, cursor: encodedCursor, sort = "hot" } = input;

      let query = ctx.db
        .selectFrom("resources as r")
        .innerJoin("users as u", "u.id", "r.sharedBy")
        .select((eb) => [
          "r.id",
          "r.title",
          "r.description",
          "r.body",
          "r.type",
          "r.url",
          "r.urlHash",
          "r.canonicalUrl",
          "r.image",
          "r.metadata",
          "r.sharedBy",
          "r.hotScore",
          "r.risingScore",
          "r.votes",
          "r.createdAt",
          "r.updatedAt",
          "u.username as sharedByUsername",
          jsonArrayFrom(
            eb
              .selectFrom("resourceDomainAreas as rda")
              .innerJoin("domainAreas as da", "da.id", "rda.domainAreaId")
              .selectAll()
              .whereRef("rda.resourceId", "=", "r.id")
              .orderBy("da.title"),
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
          sql<boolean>`EXISTS (
            SELECT 1 FROM resource_bookmarks rb 
            WHERE rb.resource_id = r.id 
            AND rb.user_id = ${userId}
          )`.as("isBookmarked"),
        ])
        .groupBy(["r.id", "u.id"]);

      if (filter) {
        switch (filter) {
          case "saved":
            query = query
              .innerJoin("resourceBookmarks as rb", "rb.resourceId", "r.id")
              .where("rb.userId", "=", userId);
            break;
          case "upvoted":
            query = query
              .innerJoin("resourceVotes as rv", "rv.resourceId", "r.id")
              .where("rv.userId", "=", userId)
              .where("rv.vote", "=", 1);
            break;
          case "downvoted":
            query = query
              .innerJoin("resourceVotes as rv", "rv.resourceId", "r.id")
              .where("rv.userId", "=", userId)
              .where("rv.vote", "=", -1);
            break;
        }
      }

      if (encodedCursor) {
        const cursor: ResourceCursor = JSON.parse(
          Buffer.from(encodedCursor, "base64").toString(),
        );

        if (!filter) {
          switch (sort) {
            case "hot":
              query = query.where((eb) =>
                eb.or([
                  eb("r.hotScore", "<", cursor.hotScore!),
                  eb.and([
                    eb("r.hotScore", "=", cursor.hotScore!),
                    eb("r.id", "<", cursor.id),
                  ]),
                ]),
              );
              break;
            case "top":
              query = query.where((eb) =>
                eb.or([
                  eb("r.votes", "<", cursor.votes!),
                  eb.and([
                    eb("r.votes", "=", cursor.votes!),
                    eb("r.id", "<", cursor.id),
                  ]),
                ]),
              );
              break;
            case "rising":
              query = query.where((eb) =>
                eb.or([
                  eb("r.risingScore", "<", cursor.risingScore!),
                  eb.and([
                    eb("r.risingScore", "=", cursor.risingScore!),
                    eb("r.id", "<", cursor.id),
                  ]),
                ]),
              );
              break;
            case "new":
              query = query.where("r.createdAt", "<", new Date(cursor.date));
              break;
          }
        } else {
          // For filtered views, just use date-based cursor
          query = query.where("r.createdAt", "<", new Date(cursor.date));
        }
      }

      // Apply sort
      if (!filter) {
        switch (sort) {
          case "hot":
            query = query.orderBy("r.hotScore", "desc");
            break;
          case "top":
            query = query.orderBy("r.votes", "desc");
            break;
          case "rising":
            query = query.orderBy("r.risingScore", "desc");
            break;
          case "new":
            query = query.orderBy("r.createdAt", "desc");
            break;
        }
      } else {
        // For filtered views, always sort by date
        query = query.orderBy("r.createdAt", "desc");
      }

      // Secondary sort by id for stable pagination
      query = query.orderBy("r.id", "desc");

      const items = await query.limit(limit + 1).execute();
      const hasNextPage = items.length > limit;
      const slicedItems = items.slice(0, limit);

      let nextCursor: string | undefined;
      if (hasNextPage && slicedItems.length > 0) {
        const last = slicedItems[slicedItems.length - 1]!;
        const cursorData: ResourceCursor = {
          id: last.id,
          date: last.createdAt.toISOString(),
          hotScore: sort === "hot" ? last.hotScore : undefined,
          votes: sort === "top" ? last.votes : undefined,
          risingScore: sort === "rising" ? last.risingScore : undefined,
        };
        nextCursor = Buffer.from(JSON.stringify(cursorData)).toString("base64");
      }

      return {
        items: slicedItems,
        nextCursor,
      };
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

  updateResource: protectedProcedure
    .input(
      LinkResourceSchema.extend({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, description, domainAreaIds } = input;
      const userId = ctx.session.user.id;

      const resource = await ctx.db
        .selectFrom("resources")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirstOrThrow();

      if (!canModifyResource(ctx.session, resource)) {
        throw new Error("Unauthorized");
      }

      return ctx.db.transaction().execute(async (tx) => {
        await tx
          .updateTable("resources")
          .set({ title, description })
          .where("id", "=", id)
          .execute();

        if (domainAreaIds?.length) {
          await tx
            .insertInto("resourceDomainAreas")
            .values(
              domainAreaIds.map((domainAreaId) => ({
                resourceId: id,
                domainAreaId,
                createdBy: userId,
              })),
            )
            .onConflict((oc) =>
              oc.columns(["resourceId", "domainAreaId"]).doNothing(),
            )
            .execute();
        }

        return tx
          .selectFrom("resources")
          .where("id", "=", id)
          .selectAll()
          .executeTakeFirstOrThrow();
      });
    }),

  deleteResource: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      const resource = await ctx.db
        .selectFrom("resources")
        .where("id", "=", input)
        .selectAll()
        .executeTakeFirst();

      if (!resource) {
        throw new Error("Resource not found");
      }

      if (!canModifyResource(ctx.session, resource)) {
        throw new Error("Unauthorized");
      }

      await ctx.db.transaction().execute(async (tx) => {
        await tx
          .deleteFrom("resourceVotes")
          .where("resourceId", "=", input)
          .execute();
        await tx
          .deleteFrom("resourceBookmarks")
          .where("resourceId", "=", input)
          .execute();
        await tx
          .deleteFrom("resourceDomainAreas")
          .where("resourceId", "=", input)
          .execute();
        await tx.deleteFrom("resources").where("id", "=", input).execute();
      });
    }),
} satisfies TRPCRouterRecord;

interface ResourceCursor {
  id: string;
  date: string;
  hotScore?: number;
  votes?: number;
  risingScore?: number;
}
