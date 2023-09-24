import { pino } from "pino";

export const logger = pino({
    formatters: {
        level(label) {
            return { level: label };
        },
        bindings(_bindings) {
            return {};
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    messageKey: "message",
    errorKey: "error",
});
