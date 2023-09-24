import { fastifyMysql, type MySQLOptions, type MySQLPromisePool } from "@fastify/mysql";
import { fastifyPlugin } from "fastify-plugin";

/**
 * MySQL plugin
 */
export const mysqlPlugin = fastifyPlugin(async (server, _options) => {
    const { MYSQL_URL } = server.config;

    await server.register(fastifyMysql, {
        type: "pool",
        promise: true,
        uri: MYSQL_URL,
        namedPlaceholders: true,
    } satisfies MySQLOptions);

    // test connection
    const conn = await server.mysql.getConnection();
    await conn.ping();
    conn.release();

    server.log.info("MySQL plugin loaded");
});

declare module "fastify" {
    interface FastifyInstance {
        mysql: MySQLPromisePool;
    }
}
