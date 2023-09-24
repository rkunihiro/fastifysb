import { Cradle } from "@fastify/awilix";

export interface IUserRepository {
    register(name: string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
    private readonly log;
    private readonly mysql;
    constructor({ log, mysql }: Pick<Cradle, "log" | "mysql">) {
        this.log = log;
        this.mysql = mysql;
    }

    async register(name: string) {
        this.log.info("save user");
        await this.mysql.query("INSERT INTO users (name) values(:name)", { name });
        return true;
    }
}
