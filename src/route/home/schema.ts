export const schema = {
    body: {
        type: "object",
        properties: {
            a: { type: "integer" },
            b: { type: "string" },
            c: { type: "string", format: "binary" },
        },
        required: [],
        additionalProperties: false,
    },
    querystring: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
    },
    params: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
    },
    headers: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
    },
    response: {
        200: {
            type: "string",
        },
    },
} as const;
