import { vpc } from "./vpc";

if ($app.stage === "production") {
  const databasePush = new sst.aws.Function("DbMigrate", {
    handler: "packages/db/migrate.ts",
    vpc,
  });

  new aws.lambda.Invocation("DbMigrateInvocation", {
    functionName: databasePush.name,
    input: JSON.stringify({
      now: new Date().toISOString(),
    }),
  });
}
