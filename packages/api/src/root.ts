import { actionsRouter } from "./router/actions";
import { authRouter } from "./router/auth";
import { avatarsRouter } from "./router/avatars";
import { domainAreasRouter } from "./router/domainAreas";
import { donationsRouter } from "./router/donations";
import { invitesRouter } from "./router/invites";
import { mappingRouter } from "./router/mapping";
import { occupationsRouter } from "./router/occupations";
import { relationshipsRouter } from "./router/relationships";
import { reportsRouter } from "./router/reports";
import { resourcesRouter } from "./router/resources";
import { rolesRouter } from "./router/roles";
import { skillsRouter } from "./router/skills";
import { userLocationsRouter } from "./router/userLocations";
import { usersRouter } from "./router/users";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  actions: actionsRouter,
  avatars: avatarsRouter,
  auth: authRouter,
  domainAreas: domainAreasRouter,
  donations: donationsRouter,
  invites: invitesRouter,
  mapping: mappingRouter,
  occupations: occupationsRouter,
  relationships: relationshipsRouter,
  reports: reportsRouter,
  resources: resourcesRouter,
  roles: rolesRouter,
  skills: skillsRouter,
  userLocations: userLocationsRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
