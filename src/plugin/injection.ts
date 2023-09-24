import { diContainer } from "@fastify/awilix";
import { asClass, asValue } from "awilix";
import type { FastifyBaseLogger, FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

import { Logger } from "../lib/log/wrapper";
import { IUserRepository, UserRepository } from "../repository/user";

export const injectionPlugin = fastifyPlugin(async (server, _options) => {
    const logger = new Logger(server.log);

    diContainer.register({
        config: asValue(server.config),
        redis: asValue(server.redis),
        mysql: asValue(server.mysql),
        log: asValue<FastifyBaseLogger>(logger),

        userRepository: asClass<IUserRepository>(UserRepository, {
            lifetime: "SINGLETON",
        }),
    });

    server.decorate("diContainer", diContainer);
});

declare module "@fastify/awilix" {
    interface Cradle {
        config: FastifyInstance["config"];
        redis: FastifyInstance["redis"];
        mysql: FastifyInstance["mysql"];
        log: FastifyBaseLogger;

        userRepository: IUserRepository;
    }
    interface RequestCradle {}
}
