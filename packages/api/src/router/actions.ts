import type { TRPCRouterRecord } from "@trpc/server";
import { LexoRank } from "lexorank";
import { z } from "zod";

import type { Action, ActionVote, DomainArea } from "@homefront/db";
import {
  ACTION_STATUSES,
  ACTION_TYPES,
  jsonArrayFrom,
  jsonObjectFrom,
  sql,
} from "@homefront/db";
import { VoteForActionSchema } from "@homefront/validators";

import { adminProcedure, protectedProcedure, publicProcedure } from "../trpc";

export const actionsRouter = {
  getAllActions: adminProcedure.query(async ({ ctx }) => {
    const actions = await ctx.db
      .selectFrom("actions as a")
      .innerJoin("users as u", "u.id", "a.createdBy")
      .leftJoin("curatedActions as ca", (join) =>
        join.onRef("ca.actionId", "=", "a.id"),
      )
      .select((eb) => [
        "a.id",
        "a.title",
        "a.description",
        "a.body",
        "a.type",
        "a.status",
        "a.dueDate",
        "a.isDueDateOverridable",
        "a.dueTime",
        "a.isDueTimeOverridable",
        "a.completedAt",
        "a.createdBy",
        "a.votes",
        "a.hotScore",
        "a.risingScore",
        "a.createdAt",
        "a.updatedAt",
        "u.username as creatorUsername",
        "ca.id as curatedActionId",
        "ca.position",
        jsonArrayFrom(
          eb
            .selectFrom("actionDomainAreas as ada")
            .innerJoin("domainAreas as da", "da.id", "ada.domainAreaId")
            .select([
              "da.id",
              "da.title",
              "da.slug",
              "da.description",
              "da.createdAt",
              "da.updatedAt",
            ])
            .whereRef("ada.actionId", "=", "a.id"),
        ).as("domainAreas"),
      ])
      .orderBy("a.title", "asc")
      .execute();

    return actions;
  }),

  getActionById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const action = await ctx.db
        .selectFrom("actions as a")
        .where("a.id", "=", input.id)
        .select((eb) => [
          "a.id",
          "a.title",
          "a.description",
          "a.body",
          "a.type",
          "a.status",
          "a.dueDate",
          "a.isDueDateOverridable",
          "a.dueTime",
          "a.isDueTimeOverridable",
          "a.completedAt",
          "a.createdBy",
          "a.votes",
          "a.hotScore",
          "a.risingScore",
          "a.createdAt",
          "a.updatedAt",
          jsonArrayFrom(
            eb
              .selectFrom("actionDomainAreas as ada")
              .innerJoin("domainAreas as da", "da.id", "ada.domainAreaId")
              .selectAll()
              .whereRef("ada.actionId", "=", "a.id"),
          ).as("domainAreas"),
          jsonObjectFrom(
            eb
              .selectFrom("actionVotes as av")
              .select([
                "av.id",
                "av.vote",
                "av.actionId",
                "av.userId",
                "av.createdAt",
                "av.updatedAt",
              ])
              .whereRef("av.actionId", "=", "a.id")
              .where("av.userId", "=", userId)
              .limit(1),
          ).as("userVote"),
        ])
        .groupBy(["a.id"])
        .executeTakeFirstOrThrow();

      return action satisfies Action & {
        domainAreas: DomainArea[];
        votes: number;
        userVote: ActionVote | null;
      };
    }),

  createAction: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullable(),
        body: z.string().nullable(),
        type: z.enum(ACTION_TYPES),
        status: z.enum(ACTION_STATUSES).nullable(),
        dueDate: z.date().nullable(),
        isDueDateOverridable: z.boolean().nullable(),
        dueTime: z.date().nullable(),
        isDueTimeOverridable: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const action = await ctx.db
        .insertInto("actions")
        .values({
          ...input,
          createdBy: ctx.session.user.id,
          votes: 1,
          hotScore: 0,
          risingScore: 0,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return action;
    }),

  updateAction: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        body: z.string().nullable(),
        type: z.enum(ACTION_TYPES),
        status: z.enum(ACTION_STATUSES).nullable(),
        dueDate: z.date().nullable(),
        isDueDateOverridable: z.boolean().nullable(),
        dueTime: z.date().nullable(),
        isDueTimeOverridable: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      const action = await ctx.db
        .updateTable("actions")
        .set(updates)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();

      return action;
    }),

  deleteAction: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction().execute(async (trx) => {
        await trx
          .deleteFrom("actionDomainAreas")
          .where("actionId", "=", input.id)
          .execute();

        return await trx
          .deleteFrom("actions")
          .where("id", "=", input.id)
          .execute();
      });

      return { success: true };
    }),

  getActionDomainAreas: publicProcedure
    .input(z.object({ actionId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { actionId } = input;

      await ctx.db
        .selectFrom("actions")
        .where("id", "=", actionId)
        .executeTakeFirstOrThrow();

      const domains = await ctx.db
        .selectFrom("domainAreas as da")
        .leftJoin("actionDomainAreas as ada", (join) =>
          join
            .onRef("ada.domainAreaId", "=", "da.id")
            .on("ada.actionId", "=", actionId),
        )
        .select([
          "da.id",
          "da.title",
          "da.slug",
          "da.description",
          sql<boolean>`(ada.id IS NOT NULL)`.as("hasDomainArea"),
        ])
        .orderBy("da.title")
        .execute();

      return domains;
    }),

  createActionDomainArea: protectedProcedure
    .input(
      z.object({
        actionId: z.string().uuid(),
        domainAreaId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await ctx.db
        .selectFrom("actions")
        .where("id", "=", input.actionId)
        .where("createdBy", "=", userId)
        .selectAll()
        .executeTakeFirstOrThrow();

      await ctx.db
        .insertInto("actionDomainAreas")
        .values({
          actionId: input.actionId,
          domainAreaId: input.domainAreaId,
        })
        .execute();

      return { success: true };
    }),

  deleteActionDomainArea: protectedProcedure
    .input(
      z.object({
        actionId: z.string().uuid(),
        domainAreaId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await ctx.db
        .selectFrom("actions")
        .where("id", "=", input.actionId)
        .where("createdBy", "=", userId)
        .selectAll()
        .executeTakeFirstOrThrow();

      await ctx.db
        .deleteFrom("actionDomainAreas")
        .where("actionId", "=", input.actionId)
        .where("domainAreaId", "=", input.domainAreaId)
        .execute();

      return { success: true };
    }),

  getUserActions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userActions = await ctx.db
      .selectFrom("userActions as ua")
      .selectAll()
      .innerJoin("actions as a", "a.id", "ua.actionId")
      .select((eb) => [
        "ua.id as userActionId",
        "a.id as actionId",
        "a.title",
        "a.body",
        "a.description",
        "a.type",
        "a.status",
        "a.dueDate",
        "a.isDueDateOverridable",
        "a.dueTime",
        "a.isDueTimeOverridable",
        "a.createdBy",
        "a.votes",
        "a.hotScore",
        "a.risingScore",
        "a.createdAt",
        "a.updatedAt",
        jsonArrayFrom(
          eb
            .selectFrom("actionDomainAreas as ada")
            .innerJoin("domainAreas as da", "da.id", "ada.domainAreaId")
            .selectAll()
            .whereRef("ada.actionId", "=", "ua.actionId"),
        ).as("domainAreas"),
      ])
      .where("ua.userId", "=", userId)
      .orderBy("ua.completedAt", "desc")
      .orderBy("ua.position", "asc")
      .execute();

    return userActions.map((userAction) => {
      const action: Action = {
        id: userAction.actionId,
        title: userAction.title,
        description: userAction.description,
        body: userAction.body,
        type: userAction.type,
        status: userAction.status,
        dueDate: userAction.dueDate,
        isDueDateOverridable: userAction.isDueDateOverridable,
        dueTime: userAction.dueTime,
        isDueTimeOverridable: userAction.isDueTimeOverridable,
        completedAt: userAction.completedAt,
        createdBy: userAction.createdBy,
        votes: userAction.votes,
        hotScore: userAction.hotScore,
        risingScore: userAction.risingScore,
        createdAt: userAction.createdAt,
        updatedAt: userAction.updatedAt,
      };

      return {
        ...userAction,
        action: {
          ...action,
          domainAreas: userAction.domainAreas,
        },
      };
    });
  }),

  getUserActionByActionId: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const userAction = await ctx.db
        .selectFrom("userActions")
        .where("actionId", "=", input)
        .where("userId", "=", userId)
        .selectAll()
        .executeTakeFirst();

      return userAction ?? { data: null };
    }),

  createUserAction: protectedProcedure
    .input(
      z.object({
        actionId: z.string().uuid(),
        completed: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { actionId, completed } = input;

      const completedAt = completed ? new Date() : null;

      // Get the last user action to calculate new position
      const lastUserAction = await ctx.db
        .selectFrom("userActions")
        .where("userId", "=", userId)
        .orderBy("position", "desc")
        .limit(1)
        .selectAll()
        .executeTakeFirst();

      let position = LexoRank.middle().format();
      if (lastUserAction) {
        position = LexoRank.parse(lastUserAction.position).genNext().format();
      }

      const userAction = await ctx.db
        .insertInto("userActions")
        .values({
          actionId,
          userId,
          completedAt,
          completed,
          position,
        })
        .returningAll()
        .execute();

      return userAction;
    }),

  updateUserAction: protectedProcedure
    .input(
      z.object({
        actionId: z.string().uuid(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { actionId, completed } = input;

      const completedAt = completed ? new Date() : null;

      const userAction = await ctx.db
        .selectFrom("userActions")
        .where("actionId", "=", actionId)
        .where("userId", "=", userId)
        .selectAll()
        .executeTakeFirst();

      if (userAction) {
        await ctx.db
          .updateTable("userActions")
          .set({
            completedAt,
            completed,
          })
          .where("actionId", "=", actionId)
          .where("userId", "=", userId)
          .execute();
      } else {
        const lastUserAction = await ctx.db
          .selectFrom("userActions")
          .where("userId", "=", userId)
          .orderBy("position", "desc")
          .limit(1)
          .selectAll()
          .executeTakeFirst();

        let position = LexoRank.middle().format();
        if (lastUserAction) {
          position = LexoRank.parse(lastUserAction.position).genNext().format();
        }

        await ctx.db
          .insertInto("userActions")
          .values({
            actionId: actionId,
            userId,
            completedAt,
            completed,
            position,
          })
          .execute();
      }

      return { success: true };
    }),

  deleteUserAction: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await ctx.db
        .deleteFrom("userActions")
        .where("id", "=", input)
        .where("userId", "=", userId)
        .execute();

      return { success: true };
    }),

  getRecommendedActions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const recommendedActions = await ctx.db
      .selectFrom("recommendedActions as ra")
      .innerJoin("actions as a", "a.id", "ra.actionId")
      .selectAll()
      .select((eb) => [
        "ra.id as recommendedActionId",
        "ra.position as recommendedActionPosition",
        "ra.accepted",
        "ra.respondedAt",
        "ra.createdAt as recommendedActionCreatedAt",
        "ra.updatedAt as recommendedActionUpdatedAt",
        "a.id as actionId",
        "a.title",
        "a.body",
        "a.description",
        "a.type",
        "a.status",
        "a.dueDate",
        "a.isDueDateOverridable",
        "a.dueTime",
        "a.isDueTimeOverridable",
        "a.completedAt",
        "a.createdBy",
        "a.votes",
        "a.hotScore",
        "a.risingScore",
        "a.createdAt",
        "a.updatedAt",
        jsonArrayFrom(
          eb
            .selectFrom("actionDomainAreas as ada")
            .innerJoin("domainAreas as da", "da.id", "ada.domainAreaId")
            .selectAll()
            .whereRef("ada.actionId", "=", "a.id"),
        ).as("domainAreas"),
        jsonObjectFrom(
          eb
            .selectFrom("actionVotes as av")
            .select([
              "av.id",
              "av.vote",
              "av.actionId",
              "av.userId",
              "av.createdAt",
              "av.updatedAt",
            ])
            .whereRef("av.actionId", "=", "a.id")
            .where("av.userId", "=", userId)
            .limit(1),
        ).as("userVote"),
      ])
      .distinctOn(["ra.position"])
      .where("ra.userId", "=", userId)
      .where("ra.respondedAt", "is", null)
      .groupBy(["ra.id", "a.id", "ra.position"])
      .orderBy("ra.position", "asc")
      .execute();

    return recommendedActions.map((ra) => {
      const action: Action = {
        id: ra.actionId,
        title: ra.title,
        description: ra.description,
        body: ra.body,
        type: ra.type,
        status: ra.status,
        dueDate: ra.dueDate,
        isDueDateOverridable: ra.isDueDateOverridable,
        dueTime: ra.dueTime,
        isDueTimeOverridable: ra.isDueTimeOverridable,
        completedAt: ra.completedAt,
        votes: ra.votes,
        hotScore: ra.hotScore,
        risingScore: ra.risingScore,
        createdBy: ra.createdBy,
        createdAt: ra.createdAt,
        updatedAt: ra.updatedAt,
      };

      return {
        id: ra.recommendedActionId,
        position: ra.position,
        accepted: ra.accepted,
        respondedAt: ra.respondedAt,
        createdAt: ra.recommendedActionCreatedAt,
        updatedAt: ra.recommendedActionUpdatedAt,
        action: {
          ...action,
          domainAreas: ra.domainAreas,
          userVote: ra.userVote satisfies ActionVote | null,
          votes: ra.votes,
        },
      };
    });
  }),

  updateRecommendedAction: protectedProcedure
    .input(
      z.object({
        actionId: z.string().uuid(),
        accepted: z.boolean(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { actionId, accepted, completed } = input;

      const completedAt = completed ? new Date() : null;
      const respondedAt = new Date();

      await ctx.db.transaction().execute(async (trx) => {
        await trx
          .updateTable("recommendedActions")
          .set({
            accepted,
            respondedAt,
          })
          .where("actionId", "=", actionId)
          .where("userId", "=", userId)
          .execute();

        // If the recommendation was accepted, create a user action
        if (accepted) {
          // Get the last user action to calculate new position
          const lastUserAction = await trx
            .selectFrom("userActions")
            .where("userId", "=", userId)
            .orderBy("position", "desc")
            .limit(1)
            .selectAll()
            .executeTakeFirst();

          let position = LexoRank.middle().format();
          if (lastUserAction) {
            position = LexoRank.parse(lastUserAction.position)
              .genNext()
              .format();
          }

          await trx
            .insertInto("userActions")
            .values({
              actionId,
              userId,
              completedAt,
              completed,
              position,
            })
            .execute();
        }
      });
    }),

  createCuratedAction: adminProcedure
    .input(
      z.object({
        actionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { actionId } = input;

      const lastCuratedAction = await ctx.db
        .selectFrom("curatedActions")
        .selectAll()
        .orderBy("position", "desc")
        .executeTakeFirst();

      let position = LexoRank.middle().format();

      if (lastCuratedAction) {
        position = LexoRank.parse(lastCuratedAction.position)
          .genNext()
          .format();
      }

      const curatedAction = await ctx.db
        .insertInto("curatedActions")
        .values({
          actionId: actionId,
          position,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return curatedAction;
    }),

  getCuratedActions: adminProcedure.query(async ({ ctx }) => {
    const curatedActions = await ctx.db
      .selectFrom("curatedActions as ca")
      .innerJoin("actions as a", "a.id", "ca.actionId")
      .select((eb) => [
        "ca.id",
        "ca.actionId",
        "ca.position",
        "a.title",
        "a.description",
        "a.body",
        "a.type",
        "a.status",
        "a.dueDate",
        "a.isDueDateOverridable",
        "a.dueTime",
        "a.isDueTimeOverridable",
        "a.completedAt",
        "a.votes",
        "a.hotScore",
        "a.risingScore",
        "a.createdBy",
        "a.votes",
        "a.hotScore",
        "a.risingScore",
        "a.createdAt",
        "a.updatedAt",
        jsonArrayFrom(
          eb
            .selectFrom("actionDomainAreas as ada")
            .innerJoin("domainAreas as da", "da.id", "ada.domainAreaId")
            .selectAll()
            .whereRef("ada.actionId", "=", "a.id"),
        ).as("domainAreas"),
      ])
      .orderBy("ca.position", "asc")
      .execute();

    return curatedActions;
  }),

  updateCuratedAction: adminProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        position: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, position } = input;

      const curatedAction = await ctx.db
        .updateTable("curatedActions")
        .set({ position })
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();

      return curatedAction;
    }),

  deleteCuratedAction: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .deleteFrom("curatedActions")
        .where("id", "=", input)
        .execute();

      return { success: true };
    }),

  generateRecommendedActions: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Get all curated actions that aren't already recommended or added
    const curatedActions = await ctx.db
      .selectFrom("curatedActions as ca")
      .leftJoin("recommendedActions as ra", (join) =>
        join
          .onRef("ra.actionId", "=", "ca.actionId")
          .on("ra.userId", "=", userId),
      )
      .leftJoin("userActions as ua", (join) =>
        join
          .onRef("ua.actionId", "=", "ca.actionId")
          .on("ua.userId", "=", userId),
      )
      .where("ra.id", "is", null)
      .where("ua.id", "is", null)
      .select(["ca.actionId", "ca.position"])
      .orderBy("ca.position", "asc")
      .execute();

    // Insert recommended actions with positions
    if (curatedActions.length > 0) {
      await ctx.db
        .insertInto("recommendedActions")
        .values(
          curatedActions.map((ca) => ({
            actionId: ca.actionId,
            userId,
            position: ca.position, // Use same position as curated action
            accepted: false,
          })),
        )
        .execute();
    }

    return { success: true };
  }),

  voteForAction: protectedProcedure
    .input(VoteForActionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { actionId, vote } = input;

      await ctx.db
        .insertInto("actionVotes")
        .values({
          actionId,
          userId,
          vote,
        })
        .onConflict((oc) =>
          oc
            .columns(["actionId", "userId"])
            .doUpdateSet({ vote, updatedAt: sql`now()` }),
        )
        .execute();
    }),
} satisfies TRPCRouterRecord;
