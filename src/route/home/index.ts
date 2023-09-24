import { FastifyPluginAsyncJsonSchemaToTs } from "@fastify/type-provider-json-schema-to-ts";

import { schema } from "./schema";

export const homeRoute: FastifyPluginAsyncJsonSchemaToTs = async (fastify, _options) => {
    fastify.post("/", { schema }, async (request, reply) => {
        const { body, query, cookies, log, session } = request;
        log.info({ body, query, cookies });
        await session.save();
        reply.send("Hello World");
    });
};
