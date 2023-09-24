import { fastifyPlugin } from "fastify-plugin";

/**
 * Error handling plugin
 */
export const errorPlugin = fastifyPlugin(async (server, _options) => {
    server.setErrorHandler(async (error, request, reply) => {
        const { code, message, validation } = error;
        request.log.error({ error });
        if (validation) {
            // Fastify schema validation error
            reply.status(400).send({ error: { code, message, validation } });
            return;
        }
        reply.status(500).send({ error: { code, message } });
    });

    server.setNotFoundHandler(async (_request, reply) => {
        reply.status(404).send({ error: { code: "NOT_FOUND", message: "Not Found" } });
    });

    server.log.info("Error handling plugin loaded");
});
