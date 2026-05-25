import { z } from "@hono/zod-openapi";

export const brandResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    logo: z.string(),
});
