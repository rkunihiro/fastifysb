import { fastifyCors, type FastifyCorsOptions } from "@fastify/cors";
import { fastifyHelmet, type FastifyHelmetOptions } from "@fastify/helmet";
import { fastifyPlugin } from "fastify-plugin";

/**
 * Secrity plugin
 */
export const securityPlugin = fastifyPlugin(async (server, _options) => {
    // CORS
    await server.register(fastifyCors, { origin: "*" } satisfies FastifyCorsOptions);
    // Helmet
    await server.register(fastifyHelmet, {} satisfies FastifyHelmetOptions);

    server.log.info("Secrity plugin loaded");
});
