import { fastifyRedis, type FastifyRedisPluginOptions } from "@fastify/redis";
import { fastifyPlugin } from "fastify-plugin";

/**
 * Redis plugin
 */
export const redisPlugin = fastifyPlugin(async (server, _options) => {
    const { REDIS_URL } = server.config;

    await server.register(fastifyRedis, {
        url: REDIS_URL,
        maxRetriesPerRequest: 1,
    } satisfies FastifyRedisPluginOptions);

    await server.redis.ping();

    server.log.info("Redis plugin loaded");
});
