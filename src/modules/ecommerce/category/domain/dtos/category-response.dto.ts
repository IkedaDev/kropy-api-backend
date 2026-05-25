import { z } from "@hono/zod-openapi";

export const categoryResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
});
