import { fastifyPlugin } from "fastify-plugin";

import { storage } from "../lib/log/storage";

export const logPlugin = fastifyPlugin(async (server, _options) => {
    server.addHook("onRequest", (request, _reply, done) => {
        storage.run(request.log, done);
    });

    server.log.info("Log plugin load completed");
});
