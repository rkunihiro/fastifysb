import { fastifyPlugin } from "fastify-plugin";

import { homeRoute } from "./home";
import { userRoute } from "./user";

export const routes = fastifyPlugin(async (server, options) => {
    await server.register(homeRoute, options);
    await server.register(userRoute, options);
});
