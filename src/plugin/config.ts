import { fastifyEnv, type FastifyEnvOptions } from "@fastify/env";
import { fastifyPlugin } from "fastify-plugin";

export const configPlugin = fastifyPlugin(async (server, _options) => {
    await server.register(fastifyEnv, {
        schema: {
            type: "object",
            properties: {
                HOST: { type: "string", default: "0.0.0.0" },
                PORT: { type: "integer", default: 4000 },
                COOKIE_SECRET: { type: "string", default: "0123456789abcdef0123456789abcdef" },
                SESSION_SECRET: { type: "string", default: "0123456789abcdef0123456789abcdef" },
                REDIS_URL: { type: "string", default: "redis://localhost:6379" },
                MYSQL_URL: { type: "string", default: "mysql://username:password@localhost:3306/dbname" },
            },
            required: [],
        },
    } satisfies FastifyEnvOptions);

    server.log.info("Config load completed");
});

declare module "fastify" {
    interface FastifyInstance {
        config: {
            HOST: string;
            PORT: number;
            COOKIE_SECRET: string;
            SESSION_SECRET: string;
            REDIS_URL: string;
            MYSQL_URL: string;
        };
    }
}
