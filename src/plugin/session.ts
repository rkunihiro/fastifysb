import type { FastifyRedis } from "@fastify/redis";
import { fastifySession, type FastifySessionOptions, type SessionStore } from "@fastify/session";
import type { Session } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

class RedisSessionStore implements SessionStore {
    constructor(private readonly redis: FastifyRedis) {}

    set(sessionId: string, session: Session, callback: (error?: unknown) => void): void {
        this.redis.set(sessionId, JSON.stringify(session), callback);
    }

    get(sessionId: string, callback: (error: unknown, result?: Session | null | undefined) => void): void {
        this.redis.get(sessionId, (error, result) => {
            if (error) {
                callback(error);
                return;
            }
            if (!result) {
                // eslint-disable-next-line unicorn/no-null
                callback(null);
                return;
            }
            // eslint-disable-next-line unicorn/no-null
            callback(null, JSON.parse(result));
        });
    }

    destroy(sessionId: string, callback: (error?: unknown) => void): void {
        this.redis.del(sessionId, callback);
    }
}

/**
 * Session plugin
 */
export const sessionPlugin = fastifyPlugin(async (server, _options) => {
    const store = new RedisSessionStore(server.redis);

    await server.register(fastifySession, {
        secret: server.config.SESSION_SECRET,
        cookieName: "sid",
        store,
    } satisfies FastifySessionOptions);

    server.log.info("Session plugin loaded");
});

declare module "fastify" {
    interface Session {}
}
