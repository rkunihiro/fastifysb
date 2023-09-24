import { fastifyCookie, type FastifyCookieOptions } from "@fastify/cookie";
import { fastifyFormbody, type FastifyFormbodyOptions } from "@fastify/formbody";
import {
    fastifyMultipart,
    type FastifyMultipartAttachFieldsToBodyOptions,
    type MultipartFile,
} from "@fastify/multipart";
import { fastifyPlugin } from "fastify-plugin";

/**
 * Parser plugin
 */
export const parserPlugin = fastifyPlugin(async (server, _options) => {
    // Add Cookie parser
    await server.register(fastifyCookie, {
        secret: server.config.COOKIE_SECRET,
        parseOptions: {
            httpOnly: true,
            sameSite: "strict",
        },
    } satisfies FastifyCookieOptions);

    // Add x-www-form-urlencoded parser
    await server.register(fastifyFormbody, {} satisfies FastifyFormbodyOptions);

    // Add multipart/form-data parser
    await server.register(fastifyMultipart, {
        attachFieldsToBody: "keyValues",
        async onFile(part) {
            const b = await part.toBuffer();
            (part as unknown as MultipartFile & { value: string }).value = b.toString("base64");
        },
    } satisfies FastifyMultipartAttachFieldsToBodyOptions);

    server.log.info("Parser plugin loaded");
});
