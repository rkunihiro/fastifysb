import { AsyncLocalStorage } from "node:async_hooks";

import type { FastifyBaseLogger } from "fastify";

export const storage = new AsyncLocalStorage<FastifyBaseLogger>();
