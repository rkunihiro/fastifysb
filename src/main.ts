import { randomUUID } from "node:crypto";
import { exit } from "node:process";

import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { fastify } from "fastify";

import { logger } from "./lib/log/logger";
import { plugins } from "./plugin";
import { routes } from "./route";

async function main() {
    const server = fastify({
        logger,
        genReqId(_request) {
            return randomUUID();
        },
        requestIdLogLabel: "requestId",
    }).withTypeProvider<JsonSchemaToTsProvider>();

    await server.register(plugins);

    await server.register(routes);

    await server.listen({
        host: server.config.HOST,
        port: server.config.PORT,
    });

    await new Promise<void>((resolve) => {
        const onSignal = async (signal: NodeJS.Signals) => {
            server.log.info(`Server close by ${signal}`);
            await server.close();
            server.log.info("Server closed");
            resolve();
        };
        process.on("SIGINT", onSignal);
        process.on("SIGTERM", onSignal);
    });
}

main()
    .then(() => {
        // eslint-disable-next-line no-console
        console.log("exit");
        // eslint-disable-next-line no-process-exit
        exit(0);
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-process-exit
        exit(1);
    });
