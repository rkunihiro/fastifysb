import type { FastifyBaseLogger } from "fastify";
import type { Bindings, ChildLoggerOptions } from "pino";

import { storage } from "./storage";

export class Logger implements FastifyBaseLogger {
    constructor(private readonly defaultLogger: FastifyBaseLogger) {}

    private get logger() {
        const logger = storage.getStore();
        if (logger) {
            return logger;
        }
        return this.defaultLogger;
    }

    get level() {
        return this.logger.level;
    }
    set level(value: string) {
        this.logger.level = value;
    }

    child(bindings: Bindings, options?: ChildLoggerOptions | undefined): FastifyBaseLogger {
        return this.logger.child(bindings, options);
    }

    fatal(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }

    error(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }

    warn(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }

    info(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }

    debug(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }

    trace(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }

    silent(object: unknown, message?: string, ...arguments_: unknown[]) {
        this.logger.fatal(object, message, ...arguments_);
    }
}
