import { Cluster, Redis } from "ioredis";
import { Resource } from "sst";

export const client =
  !Resource || Resource.Redis.host === "localhost"
    ? new Redis({
        host: Resource.Redis.host,
        port: Resource.Redis.port,
      })
    : new Cluster(
        [
          {
            host: Resource.Redis.host,
            port: Resource.Redis.port,
          },
        ],
        {
          redisOptions: {
            tls: { checkServerIdentity: () => undefined },
            username: Resource.Redis.username,
            password: Resource.Redis.password,
          },
        },
      );
