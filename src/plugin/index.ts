import { fastifyPlugin } from "fastify-plugin";

import { configPlugin } from "./config";
import { errorPlugin } from "./error";
import { injectionPlugin } from "./injection";
import { logPlugin } from "./log";
import { mysqlPlugin } from "./mysql";
import { parserPlugin } from "./parser";
import { redisPlugin } from "./redis";
import { securityPlugin } from "./security";
import { sessionPlugin } from "./session";

export const plugins = fastifyPlugin(async (server, _options) => {
    await server.register(configPlugin);

    await server.register(securityPlugin);
    await server.register(parserPlugin);
    await server.register(errorPlugin);

    await server.register(logPlugin);

    await server.register(redisPlugin);
    await server.register(mysqlPlugin);
    await server.register(sessionPlugin);

    await server.register(injectionPlugin);

    server.log.info("Plugins load completed");
});
