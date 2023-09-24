import { FastifyPluginAsyncJsonSchemaToTs } from "@fastify/type-provider-json-schema-to-ts";

export const userRoute: FastifyPluginAsyncJsonSchemaToTs = async (server, _options) => {
    const userRepository = server.diContainer.resolve("userRepository");

    server.post(
        "/user/register",
        {
            schema: {
                body: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                    },
                    required: ["name"],
                    additionalProperties: false,
                },
            } as const,
        },
        async (_request, reply) => {
            const { name } = _request.body;
            const ok = await userRepository.register(name);

            reply.send({ ok });
        },
    );
};
